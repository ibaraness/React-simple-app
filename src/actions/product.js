import { PRODUCTS } from './../data/fake_data';
import { 
    FETCH_HOMEPAGE_PRODUCTS,
    FETCH_HOMEPAGE_PRODUCTS_FAILURE,
    FETCH_HOMEPAGE_PRODUCTS_SUCCESS
 } from './action-types';

 function loadHomepageProducts(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(PRODUCTS);
        }, 1000);
    });
}

export const fetch_homepage_products = () =>{
    return {
        type: FETCH_HOMEPAGE_PRODUCTS,
        payload: loadHomepageProducts()
    }
}

export const fetch_homepage_products_success = (data) =>{
    return {
        type: FETCH_HOMEPAGE_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const fetch_homepage_products_failed = (error) =>{
    return {
        type: FETCH_HOMEPAGE_PRODUCTS_FAILURE,
        payload: error
    }
}