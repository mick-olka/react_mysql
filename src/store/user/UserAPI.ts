import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {
    LoginFormValuesI,
    QueryUserResponseI,
    RegisterFormValuesI,
    UserI,
    UserReqDataI
} from "../../interfaces/interfaces";
import config from "../config/config";
import {setToken} from "../../utils/tools";

export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: config.baseUrl}),
    endpoints: (build) => ({

        fetchRegistration: build.mutation<QueryUserResponseI, RegisterFormValuesI>({
            query: (user: UserReqDataI) => ({
                url: 'user/register',
                method: 'POST',
                body: {user: user},
                headers: {token: setToken()}
            }),
        }),

        fetchLogin: build.mutation<QueryUserResponseI, LoginFormValuesI>({
            query: (user: LoginFormValuesI) => ({
                url: 'user/login',
                method: 'POST',
                body: {user: user},
                headers: {token: setToken()}
            }),
        }),
        authCheck: build.query<{code: 0 | 1, msg: string, user?: UserI }, void>({
            query: () => ({
                url: 'auth',
                method: 'GET',
                headers: {token: setToken()}
            }),
        }),

    })
});