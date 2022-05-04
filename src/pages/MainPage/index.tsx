import React from 'react';
import s from './MainPage.module.scss';
import logo from "../../logo.svg";

export const MainPage = () => {
    return (
        <div className={s.main_pane}>
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                This is React - Redux - Typescript template from @mick-olka.
            </p>
            <span>
          <span>Learn </span>
          <a
              className="App-link"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
              className="App-link"
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
              className="App-link"
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
              className="App-link"
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
        </div>
    );
}