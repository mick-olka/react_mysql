import React, {useEffect} from 'react';
import {selectTable, setTable} from "../../store/tables/teblesSlice";
import {Table} from "../../components/Table/Table";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {tablesApi} from "../../store/tables/TablesAPI";
import s from "./TablePage.module.scss";
import {ModalPane} from "../../components/ModalPane/ModalPane";
import {TableRowForm} from "../../components/TableRowForm/TableRowForm";
import {TableRowI} from "../../interfaces/interfaces";
import toast from 'react-hot-toast';
import { getErrMsg } from "../../utils/tools";

interface TablePagePropsI {
    name: string
}

export const TablePage: React.FC<TablePagePropsI> = ({name}) => {
    let loadingToast: string | null = null;

    let table = useAppSelector(selectTable);
    const {data, error: errorFetchingTable, isLoading, refetch} = tablesApi.useFetchTableQuery({name: name});
    const [insertInTable, {error: insertError , isLoading: insertLoading}] = tablesApi.useInsertElementInTableMutation();
    const [updateInTable, {error: updateError , isLoading: updateLoading}] = tablesApi.useUpdateElementInTableMutation();
    const [deleteElement, {error: deletionError , isLoading: deletionLoading}] = tablesApi.useDeleteElementInTableMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) dispatch(setTable(data.table));
    }, [data]);

    useEffect(() => {
        toast.dismiss();
        if (insertLoading || updateLoading || deletionLoading || isLoading) loadingToast = toast.loading('Loading...');
        else toast.success('Success');
    }, [insertLoading, deletionLoading, updateLoading, isLoading]);

    const handleInsert = async (inputs: TableRowI) => {
        //console.log(inputs);
        const insertData = {name: name, element: inputs};
        await insertInTable(insertData);
        refetch();
    }
    const handleUpdate = async (element: TableRowI, prevElement: TableRowI) => {
        const updateData = {name: name, element, prevElement};
        await updateInTable(updateData);
        refetch();
    }
    const handleDelete = async (element: TableRowI) => {
        const deletionData = {name: name, element: element};
        await deleteElement(deletionData);
        refetch();
    }

    return (<div className={s.table_pane_container}>
        { insertError && <ModalPane open={true} >{getErrMsg(insertError)}</ModalPane> }
        { deletionError && <ModalPane open={true} >{getErrMsg(deletionError)}</ModalPane> }
        { updateError && <ModalPane open={true} >{getErrMsg(updateError)}</ModalPane> }
        {errorFetchingTable ? <div><h2>Error:</h2> {JSON.stringify(errorFetchingTable, null, 2)}</div> : <>
            <div className={s.control_pane}>
                {table.body.length > 0 && <>
                    <button onClick={() => refetch()}>refetch</button>
                    <ModalPane btnText={'Insert'}><><h2>Insert</h2> <TableRowForm tableRow={table.body[0]}
                                                                                  onSubmit={handleInsert}/></>
                    </ModalPane>
                </>}
            </div>
            <Table onElementDelete={handleDelete} onElementUpdate={handleUpdate} name={name} table={table}/>
        </>}
    </div>);
}