import { HIDE_SPINNER, SHOW_SPINNER } from './action-types';

export const hide_spinner = () => {
    return {
        type: HIDE_SPINNER,
        payload: false
    }
}

export const show_spinner = () => {
    return {
        type: SHOW_SPINNER,
        payload: true
    }
}