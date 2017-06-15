import { 
    FETCH_STORY_SUCCESS,
    FETCH_MAIN_STORIES_SUCCESS,
    FETCH_OTHER_STORIES_SUCCESS,
    FETCH_RELATED_STORIES_SUCCESS
 } from './../actions/action-types';


export const stories = (state = [], action) => {
    
    switch(action.type){
        case FETCH_STORY_SUCCESS:
            
            return [ ...state, action.payload];
        case FETCH_RELATED_STORIES_SUCCESS:
            return [ ...state].concat(action.payload);
        default:
            return state;
    }
}

export const mainStories = (state = [], action) => {
    switch(action.type){
        case FETCH_MAIN_STORIES_SUCCESS:
            return [ ...state, ...action.payload];
        default:
            return state;
    }
}

export const otherStories = (state = [], action) => {
    switch(action.type){
        case FETCH_OTHER_STORIES_SUCCESS:
            return [ ...state, ...action.payload];
        default:
            return state;
    }
}