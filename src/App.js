import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInitialState } from "./store/actions/app";
import Header from "./layout/header";
import Main from "./layout/main";

import "./App.scss";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitialState());
    }, []);

    return (
        <div className="App-wrapper">
            <Header />
            <Main />
        </div>
    );
}

export default App;
