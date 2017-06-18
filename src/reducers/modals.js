import { 
    GENERAL_MODAL_OPEN, GENERAL_MODAL_CLOSE
 } from './../actions/action-types';

 export const modals = (state = {}, action) => {
     switch(action.type){
        case GENERAL_MODAL_OPEN:
            return Object.assign({},state, {show:true, data: action.payload});
        case GENERAL_MODAL_CLOSE:
            return Object.assign({},state, {show:false});
        default:
            return state;
     }
 }