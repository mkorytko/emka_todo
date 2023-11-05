import React, { memo } from "react";
import { useSelector } from "react-redux";

import "./style.scss";

function Loader() {
    const { load } = useSelector((store) => store.app);

    if (!load) {
        return null;
    }

    return (
        <div className="loader-wrapper">
            <div className="progress" />
        </div>
    );
}

export default memo(Loader);
