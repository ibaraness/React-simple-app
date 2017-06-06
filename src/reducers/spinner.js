import { SHOW_SPINNER, HIDE_SPINNER } from './../actions/action-types';

export const spinner = (state = {}, action) => {
    switch(action.type){
        case SHOW_SPINNER:
        case HIDE_SPINNER:
            return action.payload;
        default:
            return state;
    }
}