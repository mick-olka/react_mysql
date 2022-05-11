import React, {useEffect, useState} from 'react'
import s from "./TableRowForm.module.scss";
import {DBRowEl} from "../../interfaces/interfaces";

interface InsertFormProps {
    onSubmit: (inputs: any) => void,
    tableRow: DBRowEl
}

export const TableRowForm: React.FC<InsertFormProps> = ({tableRow, onSubmit}) => {

    //type FormInputsType = typeof tableRow;
    const [inputs, setInputs] = useState<DBRowEl>({});

    useEffect(() => {
        let rowCopy = { ...tableRow };
        if (rowCopy.index) delete rowCopy.index;
        setInputs(rowCopy);
    }, [tableRow]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = event.target.value
        if (event.target.type === 'number') {
            value = Number(value);
        }
        setInputs( { ...inputs, [event.target.id]: value } as DBRowEl);
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const closeBtn = document.getElementById('close_btn');
        console.log(closeBtn);
        if (closeBtn) closeBtn.click();     //  close modal --- fix later
        onSubmit && onSubmit(inputs);
    }

    const inputFields = Object.entries(inputs).map(([key, value]) => {
        let type = 'text';
        switch (typeof value) {
            case 'number':
                type = 'number';
                break;
            case 'boolean':
                type = "checkbox";
                break;
            default:
                break;
        }
        return <div key={'input'+key} ><label>{key} <input value={inputs[key]} onChange={onChange} id={key} type={type}/> </label></div>;    //  text
    })

    return (
        <div className={s.container} >
            <form>
                {inputFields}
                <button type={'submit'} onClick={handleSubmit} >Submit</button>
            </form>
        </div>
    )
}