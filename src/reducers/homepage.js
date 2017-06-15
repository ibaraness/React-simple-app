import { 
    HOMEPAGE_LOADED
 } from './../actions/action-types';

 export const homepage = (state = {}, action) => {
    switch(action.type){
        case HOMEPAGE_LOADED:
            return Object.assign({}, action.payload);
        default:
            return state;
    }
}