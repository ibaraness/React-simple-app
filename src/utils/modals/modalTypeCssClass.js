import { INFO_MODAL, ERROR_MODAL, GENERAL_MODAL } from './modalTypes';

const DEFAULT_MODAL_TYPE = GENERAL_MODAL;

const modalTypeCssClasses = {
    [GENERAL_MODAL]:'general-modal',
    [ERROR_MODAL]:'error-modal',
    [INFO_MODAL]:'info-modal'
}

export const getModalTypeClass = (modalType) => {
    return modalTypeCssClasses[modalType] || modalTypeCssClasses[DEFAULT_MODAL_TYPE];
}