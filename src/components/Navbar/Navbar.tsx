import React from 'react';
import {Link} from 'react-router-dom';
import s from './Nevbar.module.scss';

export const Navbar: React.FunctionComponent = () => (
    <nav className={s.nav_pane} >
        <ul>
            <li>
                <Link className={"button"} to="/">Main Page</Link>
            </li>
            <li>
                <Link className={"button"} to="/counter" >Counter</Link>
            </li>
            <li>
                <Link className={"button"} to="/todos" >Todos</Link>
            </li>
            <li>
                <Link className={"button"} to="/info" >Info</Link>
            </li>
        </ul>
    </nav>
)