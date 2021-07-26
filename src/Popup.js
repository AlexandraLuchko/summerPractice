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
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [street, setStreet] = useState();
    const [suite, setSuite] = useState();
    const [city, setCity] = useState();
    const [zipcode, setZipcode] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [phone, setPhone] = useState();
    const [website, setWebsite] = useState();
    const [companyName, setCompanyName] = useState();
    const [companyCatchPhrase, setcompanyCatchPhrase] = useState();
    const [companyBs, setCompanyBs] = useState();

    
    return (
        <React.Fragment>
            <button id="button" onClick={() => setModal(true)}>Add user</button>
            <Modal
                visible={isModal}
                title="Add user"
                content={<form>
                    <p><input placeholder="Id" onChange={(event) => setId(event.target.value)}></input></p>
                    <p><input placeholder="Name" onChange={(event) => setName(event.target.value)}></input></p>
                    <p><input placeholder="Username" onChange={(event) => setUserName(event.target.value)}></input></p>
                    <p><input placeholder="Email" onChange={(event) => setEmail(event.target.value)}></input></p>
                    <p><input placeholder="Street" onChange={(event) => setStreet(event.target.value)}></input></p>
                    <p><input placeholder="Suite" onChange={(event) => setSuite(event.target.value)}></input></p>
                    <p><input placeholder="City" onChange={(event) => setCity(event.target.value)}></input></p>
                    <p><input placeholder="Zipcode" onChange={(event) => setZipcode(event.target.value)}></input></p>
                    <p><input placeholder="Lat" onChange={(event) => setLat(event.target.value)}></input></p>
                    <p><input placeholder="Lng" onChange={(event) => setLng(event.target.value)}></input></p>
                    <p><input placeholder="Phone" onChange={(event) => setPhone(event.target.value)}></input></p>
                    <p><input placeholder="Website" onChange={(event) => setWebsite(event.target.value)}></input></p>
                    <p><input placeholder="Company Name" onChange={(event) => setCompanyName(event.target.value)}></input></p>
                    <p><input placeholder="Company Catch Phrase" onChange={(event) => setcompanyCatchPhrase(event.target.value)}></input></p>
                    <p><input placeholder="Company Name" onChange={(event) => setCompanyBs(event.target.value)}></input></p>
                </form>
                }
                footer={
                    <div>
                        <button onClick={onClose}>Close</button>
                        <button onClick={() => props.addUser(id, name, userName, email, street, suite, city, zipcode, lat, lng, phone, website, companyName, companyCatchPhrase, companyBs)}>Submit</button>
                    </div>
                }
                onClose={onClose}
            />
        </React.Fragment>
    );
};

export default Popup;
