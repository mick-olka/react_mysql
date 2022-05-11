import s from "../../pages/LoginPage/LoginPage.module.scss";
import { Formik } from 'formik';
import React from "react";
import {LoginFormValuesI} from "../../interfaces/interfaces";

interface LoginFormProps {
    onSubmit: (values: LoginFormValuesI) => void
}

interface FormErrorsI {
    name?: string,
    password?: string
}

const validator = (values: LoginFormValuesI): FormErrorsI => {
    const errors: FormErrorsI = {};
    if (!values.name) errors.name = 'Required';
    if (!values.password) errors.password = 'Required';
    return errors;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({ onSubmit }) => {

    const submitHandler = async (values: LoginFormValuesI): Promise<void> => {
        await onSubmit(values);
    }

    return <div className={s.container} >
        <h2>Login</h2>
        <Formik
            initialValues={{ name: '', password: '' }}
            validate={validator}
            onSubmit={ async (values) => {
                // setTimeout(() => {
                //
                //     console.log(values);
                //
                //     //setSubmitting(false);
                //
                // }, 400);
                //await onSubmit(values);
                await submitHandler(values);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form className={s.auth_form} onSubmit={handleSubmit}>
                    <label>Name
                    <input
                        type="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    </label>
                    {errors.name && touched.name && errors.name}

                    <label>Password
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    </label>
                    {errors.password && touched.password && errors.password}
                    <button className={s.submit_btn} type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
}