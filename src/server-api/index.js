import { STORIES } from './../data/fake_data';


/**
 * Simulate AJAX request to the server to
 * load a single story data
 */
export function loadStory(id){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            const story = STORIES.find(s => +s.id === +id);
            (story !== null && story !== undefined)?resolve(story):reject(story);
        }, 1000);
    });
}

/**
 * Simulate AJAX request to the server to
 * load story's related stories
 * @param {*} mainStoryId - The feature story id
 * @param {*} maxStories - The max number of stories to return
 */
export function loadRelatedStories(mainStoryId, maxStories){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            const stories = STORIES.filter(s => +s.id !== +mainStoryId)
                .reduce((acc, v, i) =>{
                    return i < maxStories ? acc.concat(v):acc;
                },[]);
            resolve(stories);
        }, 1000);
    });
}

/**
 * Simulate AJAX request to the server to
 * load homepage main stories
 */
export function loadMainStories(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(STORIES.slice(0,3).map(s => s.id));
        }, 1000);
    });
}

/**
 * Simulate AJAX request to the server to
 * load homepage other stories
 */
export function loadOtherStories(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(STORIES.slice(3).map(s => s.id));
        }, 1000);      
    })
}