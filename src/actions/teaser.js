import { STORIES } from './../data/fake_data';
import {FETCH_TEASER_FAILURE, FETCH_TEASER, FETCH_TEASER_SUCCESS} from './action-types';
import {loadStoriesData} from './story';

/**
 * Test async loading with promise
 */
function loadTeaser(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            if(STORIES[0] !== null){
                resolve(STORIES[0].id)
            }else {
                reject("Story is not found!");
            }
        }, 100);
    });
}

export const fetch_teaser = () => {
    return {
        type:FETCH_TEASER,
        payload: loadTeaser()
    }
}

export const fetch_teaser_success = (data) => {
    return {
        type: FETCH_TEASER_SUCCESS,
        payload: data
    }
}

export const fetch_teaser_failure = (error) => {
    return {
        type: FETCH_TEASER_FAILURE,
        payload: error
    }
}

export const prefetch_teaser_success = (data) => {
    return (dispatch) => {
        loadStoriesData(fetch_teaser_success, dispatch, [data])
    }
}