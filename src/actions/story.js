import {loadStory, loadRelatedStories, loadMainStories, loadOtherStories} from './../server-api';
import { 
    FETCH_STORY, 
    FETCH_STORY_SUCCESS, 
    FETCH_STORY_FAILURE,
    FETCH_STORY_REQUEST,
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



/***************************************************
 * STORY ACTION CREATORS
 ***************************************************/

/**
 * Make an AJAX request to load a single story from the server
 *  @param {number} id  - The story id
 */
export const fetchStory = (id) => {
    return {
        type: FETCH_STORY,
        payload: loadStory(id)
    }
}

/**
 * Register the story request to the state (To avoid loading the same story)
 * @param {number} id  - The story id
 */
export const fetchStoryRequest = (id) => {
    return {
        type: FETCH_STORY_REQUEST,
        payload:id
    }
}

/**
 * Thunk action function to fetch a story from the server.
 * The function checks if a story has already been loaded, or is currently being loaded, 
 * if so, no farther request will be made. (That way we can prevent unnecessary requests to the server)
 * @param {number} id  - The story id
 */
export const prefetchStory = (id) =>{
    return (dispatch, getState) => {
        const { stories } = getState();
        const story = stories.find(s => +s.id === +id);
        if(story){
            if(!story.loading){
                return Promise.resolve({})
            }
        }else {
            dispatch(fetchStoryRequest(id));
        }
        return(dispatch(fetchStory(id)));
    }
}

/**
 * When a story finished loading successfully, the action creator is made to push it to state
 * @param {number} id  - The story id
 * @param {object} data - The actual story data (loaded from the server)
 */
export const fetchStorySuccess = (id, data) => {
    return {
        type: FETCH_STORY_SUCCESS,
        payload: data
    }
}

/**
 * In case of a failure in a story request, an error action will be fired
 * @param {number} id  - The story id
 * @param {object} error - An object that represent the error that was found
 */
export const fetchStoryFailed = (id, error) => {
    return {
        type: FETCH_STORY_FAILURE,
        payload: error
    }
}

/***************************************************
 * RELATED STORIES ACTION CREATORS
 ***************************************************/

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

/***************************************************
 * MAIN HOMEPAGE STORIES ACTION CREATORS
 ***************************************************/

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

/***************************************************
 * OTHER STORIES ACTION CREATORS
 ***************************************************/

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
            //TODO: Failure case handling
            dispatch(loadStoryActionSuccess(storyId, res.payload));
        });
    });
    dispatch(fetchReferenceActionSuccess(mainStoriesIds));
},[prefetchStory, fetchStorySuccess]);