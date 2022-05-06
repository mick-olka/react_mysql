import { Route, Routes } from 'react-router-dom'
import React from "react";
import {MainPage} from "../pages/MainPage";
import {TablePage} from "../pages/TablePage";
import {useAppSelector} from "../hooks/hooks";
import {selectTablesList} from "../store/tables/teblesSlice";

export const Routing = () => {
    let tablesList = useAppSelector(selectTablesList);

    return (
        <Routes>
            <Route element={<MainPage />} path={'/'} />
            {tablesList.map(t => {
                return <Route key={'route'+t.TABLE_NAME} element={<TablePage name={t.TABLE_NAME} />} path={'/table/'+t.TABLE_NAME} />
            })}
            <Route element={<div><h2>Not Found</h2></div>} path={'*'} />
        </Routes>
    );
}