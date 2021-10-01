import { call, put, takeEvery } from "@redux-saga/core/effects"
import { GET_USERS, REQUEST_USERS, DELETE_USER, SAGA_DELETE_USER, ADD_USER, CREATE_USER } from "./modules/users"

export function* sagaWatcher() {
   yield takeEvery(REQUEST_USERS, sagaWorker) 
    yield takeEvery(SAGA_DELETE_USER, sagaDeleteUser)
    yield takeEvery(ADD_USER, sagaCreateUser)
}

function* sagaWorker() {
    const payload = yield call(getUsers)
    yield put( {type: GET_USERS, payload} )
}

async function getUsers() {
    const response = await fetch('http://localhost:3000/users/')
    return await response.json()
}

function* sagaDeleteUser({payload}){
    yield put({ type: DELETE_USER, payload: payload })
}

function* sagaCreateUser({payload}){
    const user = createUser(payload)
    yield put ({ type: CREATE_USER, payload: user })
}

function createUser(payload){
    let address = {};
    address.geo = {};
    let newUser = {id: payload.id, name: payload.name, username: payload.username, email: payload.email, address: address, phone: payload.phone, website: payload.website, company: {}};
    newUser.address.street = payload.street;
    newUser.address.suite = payload.suite;
    newUser.address.city = payload.city;
    newUser.address.zipcode = payload.zipcode;
    newUser.address.geo.lat = payload.lat;
    newUser.address.geo.lng = payload.lng;
    newUser.company.name = payload.companyName;
    newUser.company.catchPhrase = payload.companyCatchPhrase;
    newUser.company.bs = payload.companyBs;
    return newUser
}
