import { 
    FETCH_STORY_SUCCESS,
    FETCH_MAIN_STORIES_SUCCESS,
    FETCH_OTHER_STORIES_SUCCESS,
    FETCH_RELATED_STORIES_SUCCESS,
    FETCH_STORY_REQUEST
 } from './../actions/action-types';
import R from 'ramda';

/**
 * Takes the new story (action.payload) and add to the state, while 
 * removing any duplicated.
 */
const fetchStorySuccess = (state, action) => {
    const story = action.payload;
    if(story){
        let filteredStories = state.filter(s=>+s.id !== +story.id);
        return [ ...filteredStories, story];
    }else {
        return state;
    }
    
}

/**
 * A partial application callback for the related stories array reduce method
 */
const reduceCallback = R.partial((fetchStorySuccess, acc, story) => {
    acc = fetchStorySuccess(acc, {payload:story});
    return acc;
},[fetchStorySuccess]);

const fetchRelatedStoriesSuccess = (state, action) => {
    const stories = action.payload.reduce(reduceCallback,state);
    return stories;     
}

export const stories = (state = [], action) => {
    
    switch(action.type){
        case FETCH_STORY_REQUEST:
            return [ ...state, {id:action.payload, loading:true}]
        case FETCH_STORY_SUCCESS:
            return fetchStorySuccess(state, action);
        case FETCH_RELATED_STORIES_SUCCESS:
            return fetchRelatedStoriesSuccess(state, action);
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