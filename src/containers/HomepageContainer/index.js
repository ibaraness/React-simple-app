import { connect } from 'react-redux';
import {
    //fetchStory, 
    //fetchStorySuccess, 
    fetchMainStories,
    prefetchMainStoriesSuccess, 
    //fetchMainStoriesSuccess,
    fetchOtherStories,
    prefetchOtherStoriesSuccess, 
} from './../../actions/story';
import { homepageLoaded } from './../../actions/homepage';
import { show_spinner, hide_spinner } from './../../actions/spinner';
import { fetch_homepage_products,fetch_homepage_products_success } from './../../actions/product';
import { fetch_teaser, fetch_teaser_success, prefetch_teaser_success } from './../../actions/teaser';
import { FETCH_MAIN_STORIES, FETCH_OTHER_STORIES, FETCH_HOMEPAGE_PRODUCTS, FETCH_TEASER } from './../../actions/action-types';
import Homepage from './../../components/pages/Homepage';
import Maybe from './../../utils/fp/Maybe'
import R from 'ramda';

/**
 * Turn state to properties
 */
const mapStateToProps = state => {
    return {
        stories: state.stories,
        mainStories: state.mainStories,
        homepageProducts: state.homepageProducts,
        teaser: state.teaser,
        otherStories: state.otherStories,
        homepage: state.homepage
    }
}

/**
 * Using the command pattern to fetch the correct action creators for each action
 */
const actionTypesToActions = {
    [FETCH_MAIN_STORIES]:prefetchMainStoriesSuccess,
    [FETCH_OTHER_STORIES]:prefetchOtherStoriesSuccess,
    [FETCH_HOMEPAGE_PRODUCTS]:fetch_homepage_products_success,
    [FETCH_TEASER]:prefetch_teaser_success
};

/**
 * Turn actions to properties
 */
const mapDispatchToProps = dispatch => {
    return {
        /**
         * Load all homepage data - Wait until all data finished loading using Promise.all
         */
        getHomepageData: () => {
            /**
             * Turn on spinner
             */
            dispatch(show_spinner());
            Promise.all([
                dispatch(fetchMainStories()),
                dispatch(fetch_homepage_products()),
                dispatch(fetch_teaser()),
                dispatch(fetchOtherStories())
                ])
                .then(response => {
                    response.forEach((res)=>{
                        /**
                         * We want to do several things:
                         * 1. Check that res has 'type' property.
                         * 2. Check that res.type exist in 'actionTypesToActions' object (Command pattern).
                         * 3. Check if error returned from promise.
                         * 4. Dispatch the success action on success, or error action on error
                         */

                        /**
                         * Dispatch a success or failure action
                         */
                        const dispatchCallback = R.partial((dispatch, actionType, error, payload, actionCreator) => {
                            actionType = actionType || 'Unknown action type';
                            /**
                             * Handle action error
                             */
                            if(actionCreator.error){
                                //TODO: Replace with dispatching error modal action
                                console.log("No action creator was found for " + actionType);
                            /**
                             * Handle server error
                             */
                            }else if(error){
                                //TODO: Replace with dispatching server error action
                                console.log("Server error loading " + actionType);
                            }else if(payload){
                                dispatch(actionCreator(payload));
                            }
                            return actionCreator;
                        },[dispatch, res.type, res.error, res.payload]);


                        /**
                         * A partial that returns the correct action creator, or null if it exist
                         * on the 'actionTypesToActions' object.
                         */
                        const actionCreatorExist = R.partial(
                            (actionTypesToActions, prop) => Maybe.of(actionTypesToActions).map(R.prop(prop)).join(), 
                            [actionTypesToActions]);
                    
                        /**
                         * Using Maybe to create the proccess
                         */
                        Maybe.of(res)
                        /**
                         * Check that res has 'type' property.
                         */
                        .map(R.prop('type'))
                        /**
                         * Check that res.type exist in 'actionTypesToActions' object (Command pattern), and return it if it does.
                         */
                        .map(actionCreatorExist)         
                        /**
                         * Action creator not found
                         */
                        .orElse({error:true})
                        /**
                         * Dispatch the correct action (success, action error or server error)
                         */
                        .map(dispatchCallback);             

                        
                    });
                    /**
                     * Set homepage loaded flag to true - so that we won't have to load it again 
                     * every time we get back to home page from different routes
                     */
                    dispatch(homepageLoaded())
            
                    /**
                     * Turn off spinner
                     */
                    dispatch(hide_spinner());
                });
        }
    }
}

const HomepageContainer = connect(mapStateToProps, mapDispatchToProps)(Homepage);
export default HomepageContainer;