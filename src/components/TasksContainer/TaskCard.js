import React, {
    memo, useCallback, useState,
} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { showNotifyAction, updateTaskAction } from "../../store/actions/app";
import TaskStatus from "./TaskStatus";
import { getIsAdmin } from "../../helpers";
import { AUTHORISE_FAILED, UPDATE_TASK_UNCHANGED } from "../../constants";

import IconButton from "../IconButton";
import editIcon from "../../assets/img/editIcon.svg";
import saveIcon from "../../assets/img/saveIcon.svg";
import resetIcon from "../../assets/img/resetIcon.svg";

function TaskCard({
    id, name, email, task, done, edited,
}) {
    const dispatch = useDispatch();
    const { isAdmin } = useSelector((store) => store.app);
    const [taskField, setTaskField] = useState(task);
    const [isEditable, setEditable] = useState(false);

    const resetState = useCallback((newTask = "") => {
        setTaskField(newTask || task);
        setEditable(false);
    }, [task, taskField]);

    const onChangeTask = useCallback(({ target: { value } }) => {
        setTaskField(value);
    }, []);

    const onChangeEditable = useCallback(() => {
        if (isEditable) {
            resetState();
        }
        setEditable(!isEditable);
    }, [isEditable, task]);

    const onUpdateTask = useCallback((isCheck = false) => () => {
        if (getIsAdmin()) {
            if (!isCheck) {
                if (task.trim() === taskField.trim()) {
                    return dispatch(showNotifyAction("info", UPDATE_TASK_UNCHANGED));
                }
            }
            const body = {
                id,
                done: isCheck ? +(!done) : +done,
                task: isCheck ? task : taskField,
            };
            return dispatch(updateTaskAction(body, () => resetState(body.task)));
        }
        resetState();
        return dispatch(showNotifyAction("error", AUTHORISE_FAILED));
    }, [resetState, taskField, task, done]);

    return (
        <tr scope="row">
            <td className="center">
                {id}
            </td>
            <td className="center">
                {name}
            </td>
            <td className="center">
                {email}
            </td>
            <td className="task">
                <div className="field">
                    {isEditable ? (
                        <label htmlFor={`task__${id}`}>
                            <input
                                onChange={onChangeTask}
                                id={`task__${id}`}
                                className="editable"
                                type="text"
                                value={taskField} />
                        </label>
                    ) : (
                        <span className="static">
                            {taskField}
                        </span>
                    )}
                    {isAdmin && (
                        <div className="edit__box">
                            <IconButton
                                className="sm"
                                alt="edit-icon"
                                onClick={onChangeEditable}
                                icon={isEditable ? resetIcon : editIcon} />
                            <IconButton
                                className="sm"
                                alt="save-icon"
                                icon={saveIcon}
                                onClick={onUpdateTask()} />
                        </div>
                    )}
                    {Boolean(edited) && (
                        <span className="edited-task">
                            Отредактировано администратором
                        </span>
                    )}
                </div>
            </td>
            <td className="task-status__wrapper center">
                <TaskStatus
                    isAdmin={isAdmin}
                    taskStatus={Boolean(done)}
                    onChangeStatus={onUpdateTask} />
            </td>
        </tr>
    );
}

TaskCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    edited: PropTypes.number.isRequired,
    done: PropTypes.number.isRequired,
};

export default memo(TaskCard);
