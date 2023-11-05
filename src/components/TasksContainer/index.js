import React, { memo } from "react";
import { useSelector } from "react-redux";
import TaskHeaderTitle from "./TaskHeaderTitle";
import TaskCard from "./TaskCard";
import TaskForm from "../TaskForm";

import { ORDER_COLS } from "../../constants";

import "./style.scss";

function TasksContainer() {
    const { tasks } = useSelector((store) => store.app);
    return (
        <div className="tasks__wrapper">
            {tasks.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            {ORDER_COLS.map((col, i) => (
                                <TaskHeaderTitle
                                    key={String(i)}
                                    {...col} />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((taskProps) => (
                            <TaskCard
                                key={String(taskProps.id)}
                                {...taskProps} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3 className="empty-tasks">Список заданий пуст</h3>
            )}
            <TaskForm />
        </div>
    );
}

export default memo(TasksContainer);
