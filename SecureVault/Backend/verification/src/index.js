// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Optional: Your global styles

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);