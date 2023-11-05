import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import store from "./store";
import "./assets/fonts/Roboto.scss";
import "react-toastify/dist/ReactToastify.css";
import "rc-pagination/assets/index.css";

import { TOASTIFY_AUTO_CLOSE_TIME } from "./constants";
import "./style.scss";

import App from "./App";
import Loader from "./components/Loader";

function Initial() {
    return (
        <Provider store={store}>
            <ToastContainer
                position="top-left"
                autoClose={TOASTIFY_AUTO_CLOSE_TIME}
                hideProgressBar
                draggable={false} />
            <App />
            <Loader />
        </Provider>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById("root"),
);
root.render(<Initial />);
