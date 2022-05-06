import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tablesReducer from './tables/teblesSlice';
import {tablesApi} from "./tables/TablesAPI";

export const store = configureStore({
  reducer: {
    tablesReducer: tablesReducer,
    [tablesApi.reducerPath]: tablesApi.reducer
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
