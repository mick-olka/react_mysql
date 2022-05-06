import React from 'react';
import {TableI} from "../../interfaces/interfaces";
import s from "../../pages/TablePage/TablePage.module.scss";
export const Table: React.FC<TableI> = ({name, result}) => {

    let fields = [];
    const table_body = result.map((row, i) => {
        return <tr key={'row'+i} >
            {Object.entries(row).map(([key, value]) => {
                return <th key={key+i} >{value}</th>;
            })}
        </tr>
    });

    if (result.length < 1) {
        return <div className={s.db_table_pane} ><h2>Table is Empty</h2></div>
    } else {
        //  get fields of table
        fields = Object.entries(result[0]).map(([key, value]) => {
            return key;
        });
    }

    return (
        <div className={s.db_table_pane} >
            <h2>{name}</h2>
            <table>
                <thead>
                <tr>
                    {fields.map((f, i) => {
                        return <th key={f} > {f} </th>
                    })}
                </tr>
                </thead>
                <tbody>
                {table_body}
                </tbody>
            </table>
        </div>
    )
}