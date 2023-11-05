export const GET_INITIAL_STATE = "GET_INITIAL_STATE";

export const SHOW_NOTIFY = "SHOW_NOTIFY";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_TOGGLE = "LOGIN_TOGGLE";
export const LOGOUT = "LOGOUT";

export const SET_PAGE = "SET_PAGE";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const SET_LOAD = "SET_LOAD";
export const SET_PAGINATION = "SET_PAGINATION";

export const LOAD_TASKS = "LOAD_TASKS";
export const CHANGE_TASK_PROPERTY = "CHANGE_TASK_PROPERTY";
export const RESET_TASK_PROPERTIES = "RESET_TASK_PROPERTIES";

export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const CHANGE_ORDER = "CHANGE_ORDER";
export const SET_ORDER_TYPE = "SET_ORDER_TYPE";

export const setLoadAction = (load) => ({
    type: SET_LOAD,
    load,
});

export const showNotifyAction = (toastType, text, callback = () => {}) => ({
    type: SHOW_NOTIFY,
    toastType,
    text,
    callback,
});

export const loginRequestAction = ({ login, pwd }, callback) => ({
    type: LOGIN_REQUEST,
    login,
    pwd,
    callback,
});

export const loginToggleAction = (isAdmin) => ({
    type: LOGIN_TOGGLE,
    isAdmin,
});

export const logoutAction = () => ({
    type: LOGOUT,
});

export const getInitialState = () => ({
    type: GET_INITIAL_STATE,
});

export const changePageAction = (page) => ({
    type: CHANGE_PAGE,
    page,
});

export const setPageAction = (page) => ({
    type: SET_PAGE,
    page,
});

export const setPaginationAction = (pagination) => ({
    type: SET_PAGINATION,
    pagination,
});

export const loadTasksAction = (tasks) => ({
    type: LOAD_TASKS,
    tasks,
});

export const setTaskPropertiesAction = (property, text) => ({
    type: CHANGE_TASK_PROPERTY,
    property,
    text,
});

export const resetTaskPropertiesAction = () => ({
    type: RESET_TASK_PROPERTIES,
});

export const addNewTaskAction = ({ body, params }) => ({
    type: ADD_TASK,
    body,
    params,
});

export const changeOrderAction = (orderCol, order) => ({
    type: CHANGE_ORDER,
    orderCol,
    order,
});

export const setOrderTypeAction = (orderCol, order) => ({
    type: SET_ORDER_TYPE,
    orderCol,
    order,
});

export const updateTaskAction = (body, callback) => ({
    type: UPDATE_TASK,
    body,
    callback,
});

export const editTaskAction = (updatedTask) => ({
    type: EDIT_TASK,
    updatedTask,
});
