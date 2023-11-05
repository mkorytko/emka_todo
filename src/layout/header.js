import React, {
    memo, useCallback, useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import Modal from "../components/AuthModal";
import { logoutAction } from "../store/actions/app";

import { MODAL_AUTO_CLOSE_TIME } from "../constants";
import { callBackIsFn } from "../helpers";

function Header() {
    const dispatch = useDispatch();
    const isAdmin = useSelector((store) => store.app.isAdmin);
    const [open, setOpen] = useState(false);

    const authModalHandler = useCallback((callback) => {
        if (isAdmin) {
            return dispatch(logoutAction());
        }
        if (callBackIsFn(callback)) {
            setTimeout(() => {
                callback();
            }, MODAL_AUTO_CLOSE_TIME);
        }
        return setOpen(!open);
    }, [open, isAdmin]);

    return (
        <header className="header">
            <Button onClick={authModalHandler}>
                {isAdmin ? "Выйти" : "Админ"}
            </Button>
            <Modal
                authModalHandler={authModalHandler}
                open={open} />
        </header>
    );
}

export default memo(Header);
