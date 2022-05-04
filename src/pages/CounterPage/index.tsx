import React from 'react';
import logo from "../../logo.svg";
import {Counter} from "../../store/counter/Counter";

export const CounterPage = () => {
    return (
        <div>
            <p>
                Counter Example.
            </p>
            <Counter />
        </div>
    );
}