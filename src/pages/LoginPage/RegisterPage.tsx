import React, {useEffect} from 'react';
import s from './LoginPage.module.scss';
import {RegisterFormValuesI} from "../../interfaces/interfaces";
import {RegisterForm} from "../../components/AuthForms/RegisterForm";
import {Link, Navigate} from "react-router-dom";
import {userApi} from "../../store/user/UserAPI";
import {ModalPane} from "../../components/ModalPane/ModalPane";
import {toast} from "react-hot-toast";
import {getErrMsg} from "../../utils/tools";
import {useAppDispatch} from "../../hooks/hooks";
import {setLogged, setUser} from "../../store/user/userSlice";

export const RegisterPage = () => {

    const dispatch = useAppDispatch();
    const [registerUser, {data, error , isLoading}] = userApi.useFetchRegistrationMutation();

    const submitRegistration = async (values: RegisterFormValuesI): Promise<void> => {
        await registerUser(values);
    }

    useEffect(() => {
        toast.dismiss();
        if (isLoading) {
            toast.loading('Loading...');
        }
    }, [isLoading]);

    useEffect(() => {
        if (data) {
            toast.success('User Registered');
            dispatch(setUser(data.user));
            dispatch(setLogged(!!data.msg.length)); //  if token exists
            localStorage.setItem('token', data.msg);
        }
    }, [data]);

    if (data?.msg.length) {
        return <Navigate replace to={'/'} />
    }

    return (
        <div className={s.main_pane}>
            { error && <ModalPane open={true} > {getErrMsg(error)} </ModalPane> }
            <RegisterForm onSubmit={submitRegistration} />
            <br/>
            <Link to={'/login'}>login</Link>
        </div>
    );
}