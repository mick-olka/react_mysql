import React, {useEffect} from 'react';
import {selectTable, setTable, tablesSlice} from "../../store/tables/teblesSlice";
import {Table} from "../../components/Table/Table";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {tablesApi} from "../../store/tables/TablesAPI";
import s from "./TablePage.module.scss";
import {ModalPane} from "../../components/ModalPane/ModalPane";

interface TablePagePropsI {
    name: string
}

const test = "rererer";

export const TablePage: React.FC<TablePagePropsI> = ({name}) => {

    let table = useAppSelector(selectTable);
    const { data, error, isLoading, refetch } = tablesApi.useFetchTableQuery({name: name});
    const [insertInTable, {error: insertError, isLoading: insertLoading}] = tablesApi.useInsertElementInTableMutation();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) dispatch(setTable(data));
    }, [data]);

    useEffect(() => {
        if (insertError) alert(JSON.stringify(insertError, null, 2));
    }, [insertError])

    if (isLoading) {
        return (<div><h2>Loading...</h2></div>);
    }
    if (error) {
        return (<div><h2>Error:</h2> {JSON.stringify(error)}</div>)
    }

    const handleInsert = async () => {
        const insertData = {name: 'dov_tov', element: {k_tt: 25, n_tt: 'Вафельниця'} };
        await insertInTable(insertData);
    }

    return (<div className={s.table_pane_container} >
        <div className="control_pane">
            <button onClick={() => refetch()} >update</button>
            <button onClick={handleInsert} disabled={insertLoading} >{insertLoading ? 'Loading...' : 'insert'}</button>
            <ModalPane btnText={'open modal'} onClose={() => {console.log('close')}} > <div>Hey there {test} </div>  </ModalPane>
        </div>
        <Table name={table.name} result={table.result} />
        </div>);
}