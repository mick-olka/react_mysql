import React, {useState} from 'react';
import s from './ModalPane.module.scss';

interface modalProps {
    children: React.ReactNode,
    btnText?: string,
    onClose?: () => void,
    open?: boolean
}

export const ModalPane: React.FunctionComponent<modalProps> = ({children, onClose, btnText, open}) => {

    const [opened, setOpened] = useState(open || false);

    const closeHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (e.currentTarget.id !== 'modal_pane') {
            onClose && onClose();
            setOpened(false);
        }
    }

    const openHandler = () => {
        setOpened(true);
    }

    return <>
        {btnText && <button onClick={openHandler}>{btnText}</button>}
        <div id={"background"} className={opened ? s.bg + ' ' + s.opened : s.bg} onClick={closeHandler}>
            <div id={"modal_pane"} className={s.pane} onClick={closeHandler}>
                <button className={s.close} id={"close_btn"} onClick={closeHandler}>✖</button>
                <div className={s.child}>
                    {children}
                </div>
            </div>
        </div>
    </>
}