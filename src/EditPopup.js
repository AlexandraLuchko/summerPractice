import React, { useEffect, useState } from 'react';
import './EditPopup.css';
import { useDispatch } from 'react-redux';
import { createUser, deleteUser } from './modules/users'


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

const EditPopup = (props) => {
    const dispatch = useDispatch()
    const[user, setUser] = useState(props.user)

    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)

    const [userName, setUserName] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const [street, setStreet] = useState(props.user.address.street);
    const [suite, setSuite] = useState(props.user.address.suite);
    const [city, setCity] = useState(props.user.address.city);
    const [zipcode, setZipcode] = useState(props.user.address.zipcode);
    const [lat, setLat] = useState(props.user.address.geo.lat);
    const [lng, setLng] = useState(props.user.address.geo.lng);
    const [phone, setPhone] = useState(props.user.phone);
    const [website, setWebsite] = useState(props.user.website);
    const [companyName, setCompanyName] = useState(props.user.company.name);
    const [companyCatchPhrase, setcompanyCatchPhrase] = useState(props.user.company.catchPhrase);
    const [companyBs, setCompanyBs] = useState(props.user.company.bs);

    useEffect(() => {
        setUser(props.user)
        setUserName(props.user.username)
        setEmail(props.user.email)
        setStreet(props.user.address.street)
        setSuite(props.user.address.suite)
        setCity(props.user.address.city)
        setZipcode(props.user.address.zipcode)
        setLat(props.user.address.geo.lat)
        setLng(props.user.address.geo.lng)
        setPhone(props.user.phone)
        setWebsite(props.user.website)
        setCompanyName(props.user.company.name)
        setcompanyCatchPhrase(props.user.company.catchPhrase)
        setCompanyBs(props.user.company.bs)
      }, [props]);

    let editUser = (id, name, userName, email, street, suite, city, zipcode, lat, lng, phone, website, companyName, companyCatchPhrase, companyBs) => {
        let user = {id, name, userName, email, street, suite, city, zipcode, lat, lng, phone, website, companyName, companyCatchPhrase, companyBs}

        dispatch(deleteUser(user.id))
        dispatch(createUser(user))
    }

    let handleChangeUser = (event) => {
        
        let newUser = {...user}
        newUser[event.target.name] = event.target.value
        setUser({...newUser})
    }

    let handleChangeCompany = (event) => {
        let newUser = user
        let newCompany = user.company
        newCompany[event.target.name] = event.target.value
        newUser.company = newCompany
        setUser({...newUser})
    }

    return (
        <React.Fragment>
            <button className="edit-button" onClick={() => setModal(true)}>Edit</button>
            <Modal
                visible={isModal}
                title="Edit"
                content={<form>
                    <p><input placeholder="Id" name="id" value={user.id} onChange={(event) => handleChangeUser(event)}></input></p>
                    <p><input placeholder="Name" name="name" value={user.name} onChange={(event) => handleChangeUser(event)}></input></p>
                    <p><input placeholder="Username" name="username" value={userName} onChange={(event) => handleChangeUser(event)}></input></p>
                    <p><input placeholder="Email" name="email" value={email} onChange={(event) => handleChangeUser(event)}></input></p>
                    <p><input placeholder="Street" name="street" value={street} onChange={(event) => setStreet(event.target.value)}></input></p>
                    <p><input placeholder="Suite" name="suite" value={suite} onChange={(event) => setSuite(event.target.value)}></input></p>
                    <p><input placeholder="City" name="city" value={city} onChange={(event) => setCity(event.target.value)}></input></p>
                    <p><input placeholder="Zipcode" name="zipcode" value={zipcode} onChange={(event) => setZipcode(event.target.value)}></input></p>
                    <p><input placeholder="Lat" name="lat" value={lat} onChange={(event) => setLat(event.target.value)}></input></p>
                    <p><input placeholder="Lng" name="lng" value={lng} onChange={(event) => setLng(event.target.value)}></input></p>
                    <p><input placeholder="Phone" name="phone" value={phone} onChange={(event) => handleChangeUser(event)}></input></p>
                    <p><input placeholder="Website" name="website" value={website} onChange={(event) => handleChangeUser(event)}></input></p>
                    <p><input placeholder="Company Name" name="companyName" value={companyName} onChange={(event) => handleChangeCompany(event)}></input></p>
                    <p><input placeholder="Company Catch Phrase" name="companyCatchPhrase" value={companyCatchPhrase} onChange={(event) => handleChangeCompany(event)}></input></p>
                    <p><input placeholder="Company Name" name="companyBs" value={companyBs} onChange={(event) => handleChangeCompany(event)}></input></p>
                </form>
                }
                footer={
                    <div>
                        <button onClick={onClose}>Close</button>
                        <button onClick={() => editUser(user.id, user.name, userName, email, street, suite, city, zipcode, lat, lng, phone, website, companyName, companyCatchPhrase, companyBs)}>Save</button>
                    </div>
                }
                onClose={onClose}
            />
        </React.Fragment>
    );
};

export default EditPopup;
