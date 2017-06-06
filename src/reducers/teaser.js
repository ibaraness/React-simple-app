import { 
    FETCH_TEASER_SUCCESS
 } from './../actions/action-types';

 const fetch_teaser_success = (state = {}, action) => {
    return action.payload;
 }

 export const teaser = (state = {}, action) => {
     switch(action.type){
        case FETCH_TEASER_SUCCESS:
            return fetch_teaser_success(state, action);
        default:
            return state;
     }
 }