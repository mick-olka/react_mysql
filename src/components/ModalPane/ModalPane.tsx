import React, {useState} from 'react';
import s from './ModalPane.module.scss';

interface modalProps {
    children: React.ReactNode,
    btnText: string,
    onClose: () => void
}

export const ModalPane: React.FunctionComponent<modalProps> = ({children, onClose, btnText}) => {

    const [opened, setOpened] = useState(false);

    const closeHandler = () => {
        onClose && onClose();
        setOpened(false);
    }

    const openHandler = () => {
        setOpened(true);
    }

    return <>
        <button onClick={openHandler} >{btnText}</button>
        <div className={opened ? s.bg + ' ' + s.opened : s.bg} onClick={closeHandler} >
        <div className={s.pane}>
            <div className="content">
                {children}
            </div>
            <button onClick={closeHandler} >Close</button>
        </div>
    </div>
        </>
}