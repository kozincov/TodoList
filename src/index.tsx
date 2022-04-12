import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppWithReducers} from "./AppWithReducers";

ReactDOM.render(
    <React.StrictMode>
        <AppWithReducers/>
    </React.StrictMode>,
    document.getElementById('root')
);
