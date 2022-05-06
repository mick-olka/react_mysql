import React, {useEffect} from 'react';
import {selectTable, setTable } from "../../store/tables/teblesSlice";
import {Table} from "../../components/Table/Table";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {tablesApi} from "../../store/tables/TablesAPI";
import s from "./TablePage.module.scss";

interface TablePagePropsI {
    name: string
}

export const TablePage: React.FC<TablePagePropsI> = ({name}) => {

    let table = useAppSelector(selectTable);
    const { data, error, isLoading } = tablesApi.useFetchTableQuery({name: name});
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) dispatch(setTable(data));
    }, [data]);

    if (isLoading) {
        return (<div><h2>Loading...</h2></div>);
    }
    if (error) {
        return (<div><h2>Error:</h2> {JSON.stringify(error)}</div>)
    }
    return (<div className={s.table_pane_container} >
        <Table name={table.name} result={table.result} />
        </div>);
}