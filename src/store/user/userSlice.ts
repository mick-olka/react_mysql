import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {UserI} from '../../interfaces/interfaces';

export interface UserStateI {
    user: UserI | null,
    status: 'idle' | 'loading' | 'failed',
    logged: boolean
}

const initialState: UserStateI = {
    user: null,
    status: 'idle',
    logged: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserI>) => {
            state.user = action.payload;
        },
        setLogged: (state, action: PayloadAction<boolean>) => {
            state.logged = action.payload;
        },
    },
});

export const { setUser, setLogged } = userSlice.actions;

export const selectUser = (state: RootState) => state.userReducer.user;
export const selectIsLogged = (state: RootState) => state.userReducer.logged;
export const selectStatus = (state: RootState) => state.userReducer.status;

export default userSlice.reducer;