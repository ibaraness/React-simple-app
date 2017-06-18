import {GENERAL_MODAL_CLOSE, GENERAL_MODAL_OPEN} from './action-types';

export const openGeneralModal = () => {
    return {
        type: GENERAL_MODAL_OPEN,
        payload:{
            title:'General Modal',
            content:'General modal content',
            modalType:'GENERAL_MODAL' //default
        }
    }
}

export const closeGeneralModal = () => {
    return {
        type: GENERAL_MODAL_CLOSE,
        payload:null
    }
}