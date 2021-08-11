import { call, put, takeEvery } from "@redux-saga/core/effects"
import { GET_USERS, REQUEST_USERS } from "./modules/users"

export function* sagaWatcher() {
   yield takeEvery(REQUEST_USERS, sagaWorker)
}

function* sagaWorker() {
    const payload = yield call(getUsers)
    yield put( {type: GET_USERS, payload} )
}

async function getUsers() {
    const response = await fetch('http://localhost:3000/users/')
    return await response.json()
}