import React from 'react';
import s from './Header.module.scss';
import {Navbar} from "../Navbar/Navbar";

export const Header: React.FunctionComponent = () => (
    <header className={s.App_header}>
        <div className={s.logo}>MHUTSAL MySQL</div>
        <Navbar />
    </header>
)