import React from 'react';
import {TableI, TableRowI} from "../../interfaces/interfaces";
import s from "../../pages/TablePage/TablePage.module.scss";
import {ModalPane} from "../ModalPane/ModalPane";
import {TableRowForm} from "../TableRowForm/TableRowForm";

interface TablePropsI {
    table: TableI,
    name: string,
    onElementDelete?: (element: TableRowI) => void
    onElementUpdate?: (element: TableRowI, prevElement: TableRowI) => void
}

export const Table: React.FC<TablePropsI> = ({name, table, onElementDelete, onElementUpdate}) => {

    let fields: { name: string, type: number }[] = table.fields.map(f => {
        return {name: f.name, type: f.type}
    });
    if (table.body.length < 1) {
        return <div className={s.db_table_pane} ><h2>Table is Empty</h2></div>
    }

    const controlCell = (name: string, row: TableRowI): React.ReactNode | null => {
        if (onElementDelete || onElementUpdate) {
            return (
                <th className={s.control_cell} >
                    { onElementDelete && <button onClick={() => onElementDelete(row)} >del</button> }
                    { onElementUpdate && <ModalPane btnText={'update'} ><> <h2>Update</h2>
                        <TableRowForm onSubmit={(values) => onElementUpdate(row, values)} tableRow={row} />
                    </>
                    </ModalPane> }
                </th>
            );
        }
        return null;
    }

    const table_body = table.body.map((row, i) => {
        return <tr key={'row'+i} >
            {fields.map((f) => {
                return <th key={'cn'+i+f.name} >{row[f.name]}</th>;
            })}
            { controlCell(name, row) }
        </tr>
    });

    return (
        <div className={s.db_table_pane} >
            <h2>{name}</h2>
            <table>
                <thead>
                <tr>
                    {fields.map((f) => {
                        return <th key={'th'+f.name} > {f.name} </th>
                    })}
                    { onElementDelete && <th> * </th> }
                </tr>
                </thead>
                <tbody>
                {table_body}
                </tbody>
            </table>
        </div>
    )
}