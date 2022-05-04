import { Route, Routes } from 'react-router-dom'
import {CounterPage} from "../pages/CounterPage";
import React from "react";
import {InfoPage} from "../pages/InfoPage";
import {MainPage} from "../pages/MainPage";
import {TodosPage} from "../pages/TodoPage";

export const Routing = () => {
    return (
        <Routes>
            <Route element={<MainPage />} path={'/'} />
            <Route element={<InfoPage />} path={'/info'} />
            <Route element={<CounterPage />} path={'/counter'} />
            <Route element={<TodosPage />} path={'/todos'} />
        </Routes>
    );
}