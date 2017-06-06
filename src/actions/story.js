import { STORIES } from './../data/fake_data';
import { 
    FETCH_STORY, 
    FETCH_STORY_SUCCESS, 
    FETCH_STORY_FAILURE,
    FETCH_MAIN_STORIES,
    FETCH_MAIN_STORIES_SUCCESS,
    FETCH_MAIN_STORIES_FAILURE,
    FETCH_OTHER_STORIES,
    FETCH_OTHER_STORIES_SUCCESS,
    FETCH_OTHER_STORIES_FAILURE,
    FETCH_RELATED_STORIES,
    FETCH_RELATED_STORIES_SUCCESS,
 } from './action-types'

/**
 * Test async loading with promise
 */
function loadStory(id){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            const story = STORIES.find(s => +s.id === +id);
            (story !== null && story !== undefined)?resolve(story):reject(story);
        }, 1000);
    });
}

function loadRelatedStories(mainStoryId, maxStories){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            /**
             * Get relative stories
             */
            const stories = STORIES.filter(s => +s.id !== +mainStoryId)
                .reduce((acc, v, i) =>{
                    return i < maxStories ? acc.concat(v):acc;
                },[]);
            resolve(stories);
        }, 1000);
    });
}

function loadMainStories(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(STORIES.slice(0,3));
        }, 1000);
    });
}

function loadOtherStories(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(STORIES.slice(3));
        }, 1000);      
    })
}

export const fetchStory = (id) => {
    return {
        type: FETCH_STORY,
        payload: loadStory(id)
    }
}

export const fetchStorySuccess = (id, data) => {
    return {
        type: FETCH_STORY_SUCCESS,
        payload: data
    }
}

export const fetchStoryFailed = (id, error) => {
    return {
        type: FETCH_STORY_FAILURE,
        payload: error
    }
}

export const fetchRelatedStories = (id, max) => {
    return {
        type: FETCH_RELATED_STORIES,
        payload: loadRelatedStories(id, max)
    }
}

export const fetchRelatedStoriesSuccess = (data) => {
    return {
        type: FETCH_RELATED_STORIES_SUCCESS,
        payload: data
    }
}

export const fetchMainStories = () =>{
    return {
        type: FETCH_MAIN_STORIES,
        payload: loadMainStories()
    }
}

export const fetchMainStoriesSuccess = (data) =>{
    return {
        type: FETCH_MAIN_STORIES_SUCCESS,
        payload: data
    }
}

export const fetchMainStoriesFailure = (error) =>{
    return {
        type: FETCH_MAIN_STORIES_FAILURE,
        payload: error
    }
}

export const fetchOtherStories = () => {
    return {
        type: FETCH_OTHER_STORIES,
        payload: loadOtherStories()
    }
}

export const fetchOtherStoriesSuccess = (data) => {
    return {
        type: FETCH_OTHER_STORIES_SUCCESS,
        payload: data
    }
}

export const fetchOtherStoriesFailure = (error) => {
    return {
        type: FETCH_OTHER_STORIES_FAILURE,
        payload: error
    }
}