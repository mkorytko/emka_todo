import React, { memo } from "react";
import PropTypes from "prop-types";

import "./style.scss";

function Button(props) {
    const {
        type = "button",
        disabled,
        children,
        onClick = () => {},
    } = props;

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className="custom-button">
            {children}
        </button>
    );
}

Button.propTypes = {
    disabled: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func,
};

export default memo(Button);
