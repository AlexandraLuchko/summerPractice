import { id } from 'prelude-ls';
import React, { useEffect, useState } from 'react';
import './Popup.css';
import Table from './Table'

interface ModalProps {
    visible: boolean,
    title: string,
    content: ReactElement | string,
    footer: ReactElement | string,
    onClose: () => void,
}

const Modal = ({
                   visible = false,
                   title = '',
                   content = '',
                   footer = '',
                   onClose,
               }: ModalProps) => {

    // создаем обработчик нажатия клавиши Esc
    const onKeydown = ({key}) => {
        switch (key) {
            case 'Escape':
                onClose()
                break;

                default:
        }
    }
      
    

    // c помощью useEffect цепляем обработчик к нажатию клавиш
    // https://ru.reactjs.org/docs/hooks-effect.html
    React.useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })


    // если компонент невидим, то не отображаем его
    if (!visible) return null;

    // или возвращаем верстку модального окна
    return <div className="modal" onClick={onClose}>
        <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h3 className="modal-title">{title}</h3>
                <span className="modal-close" onClick={onClose}>
            &times;
          </span>
            </div>
            <div className="modal-body">
                <div className="modal-content">{content}</div>
            </div>
            {footer && <div className="modal-footer">{footer}</div>}
        </div>
    </div>
}



const Popup = (props) => {
    const [isModal, setModal] = React.useState(false)
    const onClose = () => setModal(false)
    const [id, setId] = useState();
    const [name, setName] = useState();
    
    return (
        <React.Fragment>
            <button id="button" onClick={() => setModal(true)}>Add user</button>
            <Modal
                visible={isModal}
                title="Add user"
                content={<form>
                    <p><input type="text" placeholder="Id" onChange={(event) => setId(event.target.value)}></input></p>
                    <p><input placeholder="Name" type="text"></input></p>
                    <p><input placeholder="Username" type="text"></input></p>
                    <p><input placeholder="Email" type="text"></input></p>
                    <p><input placeholder="Address" type="text"></input></p>
                    <p><input placeholder="Phone" type="text"></input></p>
                    <p><input placeholder="Website" type="text"></input></p>
                    <p><input placeholder="Company" type="text"></input></p>
                </form>
                }
                footer={
                    <div>
                        <button onClick={onClose}>Close</button>
                        <button onClick={() => props.addUser(id)}>Submit</button>
                    </div>
                }
                onClose={onClose}
            />
        </React.Fragment>
    );
};

export default Popup;
