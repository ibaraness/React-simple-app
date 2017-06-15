import { 
    HOMEPAGE_LOADED
 } from './action-types';

 export const homepageLoaded = () => {
    return {
        type: HOMEPAGE_LOADED,
        payload: {loaded:true}
    }
}