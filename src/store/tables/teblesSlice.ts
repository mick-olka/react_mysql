import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {TableI, TableInfoI, TableRowI} from '../../interfaces/interfaces';

export interface TablesStateI {
    table: TableI;
    status: 'idle' | 'loading' | 'failed';
    tablesList: TableRowI[]
}

enum SQLTypes {
    Number = 3,
    Date = 10,
    String = 253
}

const initialState: TablesStateI = {
    table: { body: [], fields: [] },
    status: 'idle',
    tablesList: []
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const getTableAsync = createAsyncThunk(
//     'tables/fetchTable',
//     async (name: string) => {
//         // const response = await fetchCount(amount);
//         const response = {data: {name: name, result: [{k_tt: 243, n_tt: 'test'}, {k_tt: 243, n_tt: 'test'}]}};
//         // The value we return becomes the `fulfilled` action payload
//         return response.data;
//     }
// );

export const tablesSlice = createSlice({
    name: 'tables',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setTable: (state, action: PayloadAction<TableI>) => {
            let newData = { ...action.payload };
            action.payload.fields.forEach(f => {
                if (f.type === SQLTypes.Date) {
                    newData.body = newData.body.map(row => {
                        // @ts-ignore
                        return { ...row, [f.name]: row[f.name].split('T')[0] };
                    });
                }
            });
            state.table = newData;
        },
        setTablesList: (state, action: PayloadAction<TableRowI[]>) => {
            state.tablesList = action.payload;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getTableAsync.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(getTableAsync.fulfilled, (state, action) => {
    //             state.status = 'idle';
    //             state.table = action.payload;
    //         });
    // },
});

export const { setTable, setTablesList } = tablesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTable = (state: RootState) => state.tablesReducer.table;
export const selectTablesList = (state: RootState) => state.tablesReducer.tablesList;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//     dispatch,
//     getState
// ) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//     }
// };

export default tablesSlice.reducer;