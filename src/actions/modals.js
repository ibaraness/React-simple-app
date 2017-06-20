import {GENERAL_MODAL_CLOSE, GENERAL_MODAL_OPEN} from './action-types';
import {GENERAL_MODAL, ERROR_MODAL} from './../utils/modals/modalTypes';

export const openGeneralModal = () => {
    return {
        type: GENERAL_MODAL_OPEN,
        payload:{
            title:'General Modal',
            content:'General modal content',
            modalType: ERROR_MODAL //default
        }
    }
}

export const closeGeneralModal = () => {
    return {
        type: GENERAL_MODAL_CLOSE,
        payload:null
    }
}