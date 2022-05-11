import React, {useEffect} from 'react';
import s from './LoginPage.module.scss';
import {LoginForm} from "../../components/AuthForms/LoginForm";
import {LoginFormValuesI} from "../../interfaces/interfaces";
import {Link, Navigate} from "react-router-dom";
import {userApi} from "../../store/user/UserAPI";
import {toast} from "react-hot-toast";
import {setLogged, setUser} from "../../store/user/userSlice";
import { useAppDispatch } from '../../hooks/hooks';
import {ModalPane} from "../../components/ModalPane/ModalPane";
import {getErrMsg} from "../../utils/tools";

export const LoginPage = () => {

    const dispatch = useAppDispatch();

    const [loginUser, {data, error, isLoading}] = userApi.useFetchLoginMutation();

    const submitLogin = async (values: LoginFormValuesI): Promise<void> => {
        await loginUser(values);
    }

    useEffect(() => {
        toast.dismiss();
        if (isLoading) {
            toast.loading('Loading...');
        }
    }, [isLoading]);

    useEffect(() => {
        if (data) {
            toast.success('User Logged');
            dispatch(setUser(data.user));
            dispatch(setLogged(!!data.msg.length)); //  if token exists
            localStorage.setItem('token', data.msg);
        }
    }, [data]);

    if (data?.msg.length) { //  if token
        return <Navigate replace to={'/'} />
    }

    return (
        <div className={s.main_pane}>
            { error && <ModalPane open={true} > {getErrMsg(error)} </ModalPane> }
            <LoginForm onSubmit={submitLogin} />
            <br/>
            <Link to={'/register'}>register</Link>
        </div>
    );
}