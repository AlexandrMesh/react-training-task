import { SET_DATA_LIMIT, SET_DATA_SIZE, REFRESH_DATA } from '../actionTypes/actionTypes'

export function setStoreWithLimit(value) {
    return {
        type: SET_DATA_LIMIT,
        payload: value
    };
}

export function setStoreWithSize(value) {
    return {
        type: SET_DATA_SIZE,
        payload: value
    };
}

export function refreshDataStore(value) {
    return {
        type: REFRESH_DATA,
        payload: value
    };
}