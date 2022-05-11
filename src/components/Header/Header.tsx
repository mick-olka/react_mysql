import React from 'react';
import s from './Header.module.scss';
import {Navbar} from "../Navbar/Navbar";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/hooks";
import {setLogged} from "../../store/user/userSlice";

export const Header: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setLogged(false));
    }

    return (
        <header className={s.App_header}>
            <div className={s.logo}>MHUTSAL MySQL</div>
            <Navbar/>
            <div onClick={handleLogout}><Link to={'/login'}>logout</Link></div>
        </header>
    )
};
