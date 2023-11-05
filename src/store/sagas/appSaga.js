import {
    call, put, takeLatest, select,
} from "redux-saga/effects";
import {
    GET_INITIAL_STATE,
    CHANGE_PAGE, ADD_TASK,
    CHANGE_ORDER,
    UPDATE_TASK,
    loadTasksAction,
    setLoadAction,
    resetTaskPropertiesAction,
    setOrderTypeAction,
    setPageAction,
    editTaskAction,
    loginToggleAction,
    showNotifyAction,
} from "../actions/app";
import {
    paginationWorker,
} from "./utilsSaga";

import getTasksFetch from "../../api/getTasks";
import addTaskFetch from "../../api/addTask";
import updateTask from "../../api/updateTask";
import { getIsAdmin } from "../../helpers";
import { TASK_ADD_SUCCESS } from "../../constants";

export function* addTask({ body }) {
    try {
        yield put(setLoadAction(true));
        const { orderCol, order, page } = yield select((store) => store.app);
        const params = { orderCol, order, page };
        const result = yield call(addTaskFetch, body, params);
        if (result.success) {
            yield put(loadTasksAction(result.payload));
            yield call(paginationWorker, result.pagination);
            yield put(resetTaskPropertiesAction());
            yield put(showNotifyAction("success", TASK_ADD_SUCCESS));
        }
    } catch (err) {
        yield put(showNotifyAction("error", err.message));
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherAddTask() {
    try {
        yield takeLatest(ADD_TASK, addTask);
    } catch (err) {
        console.warn("watcherAddTask", err);
    }
}

function* fetchTasks(param) {
    try {
        const result = yield call(getTasksFetch, param);
        let tasks = [];
        let pagination = null;
        if (result.success) {
            tasks = [...result.payload];
            pagination = { ...result.pagination };
        }
        yield put(loadTasksAction(tasks));
        return pagination;
    } catch (err) {
        yield put(showNotifyAction("error", err.message));
    }
}

function* getInitialSateWorker() {
    try {
        yield put(setLoadAction(true));
        if (getIsAdmin()) {
            yield put(loginToggleAction(true));
        }
        const pagination = yield call(fetchTasks);
        yield call(paginationWorker, pagination);
    } catch (err) {
        yield put(showNotifyAction("error", err.message));
        console.warn(err);
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherInitialSate() {
    try {
        yield takeLatest(GET_INITIAL_STATE, getInitialSateWorker);
    } catch (err) {
        console.warn("watcherInitialSate", err);
    }
}

function* changePageWorker({ page }) {
    try {
        yield put(setLoadAction(true));
        const { order, orderCol } = yield select((store) => store.app);
        yield call(fetchTasks, { page, order, orderCol });
        yield put(setPageAction(page));
    } catch (err) {
        console.warn(err);
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherChangePage() {
    try {
        yield takeLatest(CHANGE_PAGE, changePageWorker);
    } catch (err) {
        console.warn("watcherChangePage", err);
    }
}

function* changeOrderWorker({ orderCol, order }) {
    try {
        yield put(setLoadAction(true));
        const { page } = yield select((store) => store.app);
        yield put(setOrderTypeAction(orderCol, order));
        yield call(fetchTasks, { page, orderCol, order });
    } catch (err) {
        console.warn(err);
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherChangeOrder() {
    try {
        yield takeLatest(CHANGE_ORDER, changeOrderWorker);
    } catch (err) {
        console.warn("watcherChangeOrder", err);
    }
}

function* updateTaskOrderWorker(params) {
    try {
        yield put(setLoadAction(true));
        const task = yield call(updateTask, params.body, params?.callback);
        yield put(editTaskAction(task));
    } catch (err) {
        yield put(showNotifyAction("error", err.message));
        console.warn(err);
    } finally {
        yield put(setLoadAction(false));
    }
}

export function* watcherUpdateTask() {
    try {
        yield takeLatest(UPDATE_TASK, updateTaskOrderWorker);
    } catch (err) {
        console.warn("watcherUpdateTask", err);
    }
}
