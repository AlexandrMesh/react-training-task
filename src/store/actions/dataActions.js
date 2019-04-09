import { UPDATE_SIZE, UPDATE_LIMIT, REFRESH } from '../actionTypes/actionTypes'

export function updateLimit(value) {
    return {
        type: UPDATE_LIMIT,
        payload: value
    };
}

export function updateSize(value) {
    return {
        type: UPDATE_SIZE,
        payload: value
    };
}

export function refresh(value) {
    return {
        type: REFRESH,
        payload: value
    };
}