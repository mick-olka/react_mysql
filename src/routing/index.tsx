import {Route, Routes, Navigate} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import {MainPage} from "../pages/MainPage";
import {TablePage} from "../pages/TablePage/TablePage";
import {useAppSelector} from "../hooks/hooks";
import {selectTablesList} from "../store/tables/teblesSlice";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {RegisterPage} from "../pages/LoginPage/RegisterPage";
import {selectIsLogged} from "../store/user/userSlice";
import {NotFound} from "../components/NotFound/NotFound";

export const Routing = () => {
    let tablesList = useAppSelector(selectTablesList);
    let isLogged = useAppSelector(selectIsLogged);
    const [path, setPath] = useState('/table/' + window.location.href.split('/').pop());
    return (
        <Routes>
            {isLogged ? <>
                <Route element={<MainPage/>} path={'/'}/>
                <Route element={<Navigate replace to={path} />} path={'/login'}/>
                <Route element={<Navigate replace to={path} />} path={'/register'}/>
                {tablesList.map(t => {
                    return <Route key={'route' + t.TABLE_NAME} element={<TablePage name={t.TABLE_NAME + ''}/>}
                                  path={'/table/' + t.TABLE_NAME}/>
                })}
            </> : <>
                <Route element={<LoginPage/>} path={'/login'}/>
                <Route element={<RegisterPage/>} path={'/register'}/>
            </>}
            <Route element={<NotFound isLogged={isLogged} />} path={'*'}/>
        </Routes>
    );
}