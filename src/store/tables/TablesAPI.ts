import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {TableI, TableInfoI} from "../../interfaces/interfaces";

interface DBQueryParams {
    name: string,
    limit?: number,
    page?: number
}

export const tablesApi = createApi({
    reducerPath: 'tablesAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.0.103:5000/'}),
    endpoints: (build) => ({

       fetchTable: build.query<TableI, DBQueryParams>({
           query: ({name, limit = 100, page = 1}) => ({
               url: `db/${name}`,
               params: {
                   _limit: limit,
                   _page: page
               }
           }),
           transformResponse: (response: { data: TableI }, meta, arg) => response.data,
       }),

        fetchAllTablesInfo: build.query<TableInfoI[], void>({
            query: () => ({
                url: 'db/all'
            }),
            transformResponse: (response: { data: TableInfoI[] }, meta, arg) => {
                return response.data.map((f: TableInfoI) => {
                    return {TABLE_NAME: f.TABLE_NAME, TABLE_ROWS: f.TABLE_ROWS}
                });
            }
        }),

    })
});