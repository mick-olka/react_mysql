import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tablesReducer from './tables/teblesSlice';
import userReducer from './user/userSlice';
import {tablesApi} from "./tables/TablesAPI";
import {userApi} from "./user/UserAPI";

export const store = configureStore({
  reducer: {
    tablesReducer: tablesReducer,
    userReducer: userReducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tablesApi.middleware),  //  connect middleware like thunk
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
