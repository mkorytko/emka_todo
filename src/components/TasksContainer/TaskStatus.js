import React, { memo, useMemo } from "react";
import * as PropTypes from "prop-types";
import IconButton from "../IconButton";

import doneStatusIcon from "../../assets/img/done.svg";
import noDoneStatusIcon from "../../assets/img/noDone.svg";

function TaskStatus(props) {
    const {
        isAdmin,
        taskStatus,
        onChangeStatus,
    } = props;

    const buttonProps = useMemo(() => {
        if (isAdmin) {
            return { icon: taskStatus ? doneStatusIcon : noDoneStatusIcon };
        }
        return {
            disabled: true,
            icon: taskStatus ? doneStatusIcon : noDoneStatusIcon,
        };
    }, [isAdmin, taskStatus]);

    return (
        <IconButton
            {...buttonProps}
            onClick={onChangeStatus(true)}
            className="status-icon-button no-hover"
            alt="status-icon" />
    );
}

TaskStatus.propTypes = {
    taskStatus: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
};

export default memo(TaskStatus);
