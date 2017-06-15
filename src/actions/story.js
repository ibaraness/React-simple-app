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
import Maybe from './../utils/fp/Maybe'
import R from 'ramda';

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

/**
 * 
 * @param {*} mainStoryId 
 * @param {*} maxStories 
 */
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
            resolve(STORIES.slice(0,3).map(s => s.id));
        }, 1000);
    });
}

function loadOtherStories(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(STORIES.slice(3).map(s => s.id));
        }, 1000);      
    })
}

/**
 * STORY ACTION CREATORS
 */

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

/**
 * RELATED STORIES ACTION CREATORS
 */

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

/**
 * MAIN HOMEPAGE STORIES ACTION CREATORS
 */


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

/**
 * Function action to load stories (Thunk middleware)
 */
export const prefetchMainStoriesSuccess = (mainStoriesIds) => { 
    return (dispatch, getState) => {
        console.log("state", getState());
        loadStoriesData(fetchMainStoriesSuccess, dispatch, mainStoriesIds)
    }
}

/**
 * OTHER STORIES ACTION CREATORS
 */
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

export const prefetchOtherStoriesSuccess = (data) => {
    return (dispatch, getState) => {
        console.log("state", getState());
        loadStoriesData(fetchOtherStoriesSuccess, dispatch, data, getState)
    }
}

/**
 * Helper partial application function that loads the main stories
 * We are looping through main stories id's, and load each story
 * 
 * @param {*} loadStoryAction - the action creator for loading a single story (returns a promise)
 * @param {*} loadStoryActionSuccess - The action creator for success loading of a single story
 * @param {*} fetchReferenceActionSuccess - The action creator for success loading of main stories (fires last)
 */
export const loadStoriesData = R.partial((loadStoryAction,loadStoryActionSuccess, fetchReferenceActionSuccess, dispatch, mainStoriesIds) => {
    mainStoriesIds.forEach(storyId => {
        dispatch(loadStoryAction(storyId)).then(res => {
            //console.log("storyId", storyId);
            dispatch(loadStoryActionSuccess(storyId, res.payload));
        });
    });
    dispatch(fetchReferenceActionSuccess(mainStoriesIds));
},[fetchStory, fetchStorySuccess]);