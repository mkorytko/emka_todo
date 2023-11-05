import React, { memo } from "react";
import classnames from "classnames";
import * as PropTypes from "prop-types";

import "./style.scss";

function ClearInputButton(props) {
    const { onClear, top } = props;

    return (
        <button
            tabIndex={-1}
            type="button"
            onClick={onClear}
            className={classnames("clear-button", { top })}>
            &times;
        </button>
    );
}

ClearInputButton.propTypes = {
    onClear: PropTypes.func.isRequired,
    top: PropTypes.bool,
};

export default memo(ClearInputButton);
