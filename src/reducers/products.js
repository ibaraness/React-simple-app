import { 
    FETCH_HOMEPAGE_PRODUCTS_SUCCESS
 } from './../actions/action-types';

const fetch_hompage_products_success = (state = [], action) => {
    return action.payload;
}

export const homepageProducts = (state = [], action) => {
    switch(action.type){
        case FETCH_HOMEPAGE_PRODUCTS_SUCCESS:
            return fetch_hompage_products_success(state.mainStories, action);
        default:
            return state;
    }
}