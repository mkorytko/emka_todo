import React, {
    memo, useEffect, useState, useCallback, useRef,
} from "react";
import * as PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Button from "../Button";
import { loginRequestAction, showNotifyAction } from "../../store/actions/app";
import {
    ADMIN_LOGIN, ADMIN_PWD,
    AUTH_ERROR_AUTO_CLEAR_TIME,
    AUTHORISE_FAILED_RULES,
} from "../../constants";

import "./style.scss";

const initialLogData = {
    login: "",
    pwd: "",
};

function AuthModal(props) {
    const { open, authModalHandler } = props;
    const dispatch = useDispatch();
    const [fields, setFields] = useState({ ...initialLogData });
    const [error, setError] = useState(false);
    const loginInputRef = useRef(null);

    const onChangeInput = useCallback(({ target }) => {
        setFields({ ...fields, [target.name]: target.value });
    }, [fields]);

    useEffect(() => {
        if (open) {
            loginInputRef.current.focus();
        } else {
            loginInputRef.current.blur();
        }
    }, [open]);

    const onClose = useCallback(() => {
        authModalHandler(() => setFields({ ...initialLogData }));
    }, [authModalHandler]);

    const _onSubmit = useCallback((ev) => {
        ev.preventDefault();
        const { login, pwd } = fields;
        if (login && pwd) {
            if (login !== ADMIN_LOGIN || pwd !== ADMIN_PWD) {
                setError(true);
            }
            return dispatch(loginRequestAction({ login, pwd }, onClose));
        }
        dispatch(showNotifyAction("error", AUTHORISE_FAILED_RULES));
        return setError(true);
    }, [fields]);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false);
            }, AUTH_ERROR_AUTO_CLEAR_TIME);
        }
    }, [error]);

    return (
        <form
            onSubmit={_onSubmit}
            className={`modal-container ${open ? "active" : ""}`}>
            <label htmlFor="login">
                <input
                    ref={loginInputRef}
                    onChange={onChangeInput}
                    value={fields.login}
                    className={`form-input ${error ? "error" : ""}`}
                    name="login"
                    placeholder="логин"
                    type="text"
                    id="login" />
            </label>
            <label htmlFor="pwd">
                <input
                    onChange={onChangeInput}
                    value={fields.pwd}
                    className={`form-input ${error ? "error" : ""}`}
                    name="pwd"
                    placeholder="пароль"
                    type="text"
                    id="pwd" />
            </label>
            <div className="footer">
                <Button
                    type="button"
                    onClick={onClose}>
                    Закрыть
                </Button>
                <Button type="submit">
                    Войти
                </Button>
            </div>
        </form>
    );
}

AuthModal.propTypes = {
    open: PropTypes.bool.isRequired,
    authModalHandler: PropTypes.func.isRequired,
};

export default memo(AuthModal);
