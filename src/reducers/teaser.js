import { 
    FETCH_TEASER_SUCCESS
 } from './../actions/action-types';

 export const teaser = (state = [], action) => {
     switch(action.type){
        case FETCH_TEASER_SUCCESS:
            return [ ...state, ...action.payload];
        default:
            return state;
     }
 }