import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from './modules/users';
import './Popup.css';

const Modal = ({
                   visible = false,
                   title = '',
                   content = '',
                   footer = '',
                   onClose,
               }) => {

    const onKeydown = ({key}) => {
        switch (key) {
            case 'Escape':
                onClose()
                break;

                default:
                break;
        }
    }
      
    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    if (!visible) return null;

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
    const dispatch = useDispatch()

    const [user, setUser] = useState({})

    const [isModal, setModal] = useState(false)
    const onClose = () => {
        setUser({})
        setModal(false)       
    }

    let handleChange = (event) => {
        let newUser = {...user}
        newUser[event.target.name] = event.target.value
        setUser({...newUser})
    }

    return (
        <React.Fragment>
            <button id="button" onClick={() => setModal(true)}>Add user</button>
            <Modal
                visible={isModal}
                title="Add user"
                content={
                <form>
                    <p><input name="id" placeholder="Id" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="name" placeholder="Name" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="username" placeholder="Username" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="email" placeholder="Email" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="street" placeholder="Street" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="suite" placeholder="Suite" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="city" placeholder="City" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="zipcode" placeholder="Zipcode" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="lat" placeholder="Lat" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="lng" placeholder="Lng" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="phone" placeholder="Phone" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="website" placeholder="Website" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="companyName" placeholder="Company Name" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="companyCatchPhrase" placeholder="Company Catch Phrase" onChange={(event) => handleChange(event)}></input></p>
                    <p><input name="companyBs" placeholder="Company Bs" onChange={(event) => handleChange(event)}></input></p>
                </form>}
                footer={
                    <div>
                        <button onClick={onClose}>Close</button>
                        <button onClick={() =>  dispatch(createUser(user))}>Submit</button>
                    </div>
                }
                onClose={onClose}
            />
        </React.Fragment>
    );
};

export default Popup;
