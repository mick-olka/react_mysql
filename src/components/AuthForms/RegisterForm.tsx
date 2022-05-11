import s from "../../pages/LoginPage/LoginPage.module.scss";
import { Formik } from 'formik';
import React from "react";
import {RegisterFormValuesI} from "../../interfaces/interfaces";

interface LoginFormProps {
    onSubmit: (values: RegisterFormValuesI) => void
}

interface FormErrorsI {
    email?: string,
    password?: string,
    name?: string
}

const validator = (values: RegisterFormValuesI): FormErrorsI => {
    const errors: FormErrorsI = {};
    if (!values.email) errors.email = 'Required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) errors.password = 'Required';
    if (!values.name) errors.name = 'Required';
    return errors;
}

export const RegisterForm: React.FunctionComponent<LoginFormProps> = ({ onSubmit }) => {

    const submitHandler = async (values: RegisterFormValuesI): Promise<void> => {
        await onSubmit(values);
    }

    return <div className={s.container} >
        <h2>Register</h2>
        <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validate={validator}
            onSubmit={ async (values) => {
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
                    <label>Email
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    </label>
                    {errors.email && touched.email && errors.email}

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