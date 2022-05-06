import React, {useRef, useState} from 'react'
import s from "./InsertForm.module.scss";
import {DBRowEl, DBTable} from "../../interfaces/interfaces";

interface InsertFormProps {
    onSubmit: () => void,
    tableRow: DBRowEl
}

export const InsertForm: React.FC<InsertFormProps> = ({tableRow, onSubmit}) => {
    type FormInputsType = typeof tableRow;
    const [inputs, setInputs] = useState<FormInputsType>({...tableRow})
    // const tableRow: DBRowEl = table ? table[0] : [];

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.id, event.target.value);
    }

    const inputFields = Object.entries(tableRow).map(el => {
        let type = 'text';
        switch (typeof el[1]) {
            case 'number':
                type = 'number';
                break;
            case 'boolean':
                type = "checkbox";
                break;
            default:
                break;
        }
        return <label>{el[0]} <input value={inputs[el[0]]} onChange={} id={'input_'+el[0]} type={type}/> </label>;    //  text
    })

    // const keyPressHandler = (event: React.KeyboardEvent) => {
    //     if (event.key === 'Enter') {
    //         props.onAdd(ref.current!.value)
    //         ref.current!.value = ''
    //         // console.log(title)
    //         // setTitle('')
    //     }
    // }

    const onChange = (key, value) => {
        setInputs()
    }

    const handleSubmit = () => {

    }

    return (
        <div className={s.container} >
            <form>
                {inputFields}
                <button type={'submit'} onClick={handleSubmit} >Submit</button>
            </form>
        </div>
    )
}