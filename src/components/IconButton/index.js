import React, { memo } from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";

import "./style.scss";

function IconButton(props) {
    const {
        onClick,
        alt,
        icon,
        children,
        disabled,
        className = "",
    } = props;

    return (
        <button
            disabled={disabled}
            tabIndex={-1}
            type="button"
            onClick={onClick}
            className={classnames("icon-button", className)}>
            {icon ? (
                <img
                    className="icon"
                    src={icon}
                    alt={alt} />
            ) : children}
        </button>
    );
}

IconButton.propTypes = {
    alt: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
};

export default memo(IconButton);
