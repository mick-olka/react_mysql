import React from 'react';
import {Link} from 'react-router-dom';
import s from './Nevbar.module.scss';
import {useAppSelector} from "../../hooks/hooks";
import { selectTablesList} from "../../store/tables/teblesSlice";

export const Navbar: React.FunctionComponent = () => {

    let tablesList = useAppSelector(selectTablesList);

    return <nav className={s.nav_pane}>
        <ul>
            <li>
                <Link className={"button"} to="/">Main Page</Link>
            </li>
            <li className={s.dropdown}><a className={"button"} href="#" aria-haspopup="true">Tables</a>
                <ul className="dropdown" aria-label="submenu">
                    {tablesList.map(t => {
                        return <li key={t.TABLE_NAME} ><Link to={"/table/"+t.TABLE_NAME}>{t.TABLE_NAME}</Link></li>
                    })}
                </ul>
            </li>
        </ul>
    </nav>
}