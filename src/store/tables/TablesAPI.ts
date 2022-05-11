import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {DBRowEl, InsertionResI, QueryDBResponseI} from "../../interfaces/interfaces";
import config from "../config/config";
import {setToken} from "../../utils/tools";

interface DBQueryParams {
    name: string,
    limit?: number,
    page?: number
}

export const tablesApi = createApi({
    reducerPath: 'tablesAPI',
    baseQuery: fetchBaseQuery({baseUrl: config.baseUrl}),
    endpoints: (build) => ({

       fetchTable: build.query<QueryDBResponseI, DBQueryParams>({
           query: ({name, limit = 100, page = 1}) => ({
               url: `db/${name}`,
               params: {
                   _limit: limit,
                   _page: page
               },
               headers: {token: setToken()}
           }),
       }),

        fetchAllTablesInfo: build.mutation<QueryDBResponseI, void>({
            query: () => ({
                url: 'db/all',
                method: 'POST',
                body: {tablesList: config.tablesList},
                headers: {token: setToken()}
            }),
            transformResponse: (response: QueryDBResponseI, meta, arg) => {
                const result = response.table.body.map(f => {
                    return {TABLE_NAME: f.TABLE_NAME, TABLE_ROWS: f.TABLE_ROWS}
                });
                return { table: { body: result, fields: response.table.fields }, err: null }
            }
        }),

        insertElementInTable: build.mutation<InsertionResI, {name: string, element: DBRowEl}>({
            query: ({name, element}) => ({
                url: `db/${name}`,
                method: 'PUT',
                body: {element},
                headers: {token: setToken()}
            }),
        }),

        updateElementInTable: build.mutation<any, {name: string, element: DBRowEl, prevElement: DBRowEl}>({
            query: ({name, element, prevElement}) => ({
                url: `db/${name}`,
                method: 'PATCH',
                body: {element, prevElement},
                headers: {token: setToken()}
            }),
        }),

        deleteElementInTable: build.mutation<any, {name: string, element: DBRowEl}>({
            query: ({name, element}) => ({
                url: `db/${name}`,
                method: 'POST',
                body: {element},
                headers: {token: setToken()}
            }),
        }),

    })
});