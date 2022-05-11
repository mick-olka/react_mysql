import React from 'react';
import {Link, Navigate} from "react-router-dom";

export const NotFound:React.FC<{ isLogged: boolean }> = ({isLogged}) => {
    return (
        <div>
            <div><h2>Not Found</h2></div>
            { isLogged ? <Link to={'/'}>Main</Link> : <Navigate replace to={'/login'} /> }
        </div>
    );
}
