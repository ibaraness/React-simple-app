
import { connect } from 'react-redux';
import { 
    fetchStory, 
    fetchStorySuccess, 
    fetchMainStories, 
    fetchMainStoriesSuccess,
    fetchOtherStories,
    fetchOtherStoriesSuccess 
} from './../../actions/story';
import { fetch_homepage_products,fetch_homepage_products_success } from './../../actions/product'
import { fetch_teaser, fetch_teaser_success } from './../../actions/teaser';
import Homepage from './../../components/pages/Homepage';
import { promiseInterceptor } from './../../utils/promise-interceptor';

/**
 * Prepare all homepage data before showing the page
 *  - Load main stories to state
 */



/**
 * Turn state to properties
 */
const mapStateToProps = state => {
    return {
        stories: state.stories,
        mainStories: state.mainStories,
        homepageProducts: state.homepageProducts,
        teaser: state.teaser,
        otherStories: state.otherStories
    }
}

/**
 * Turn actions to properties
 */
const mapDispatchToProps = dispatch => {
    return {
        getStory: id => {
            /**
             * Wrapping our Promise action with our promiseInterceptor function allow
             * us to show and hide a loader
             */
            promiseInterceptor(dispatch, fetchStory(id))
            /**
             * Our current action's payload is a Promise, which also returns a promise (then() chaining)
             * Which allow us to use 'then()' method again (...and again if we like) 
             */
            .then((response)=>{
                /**
                 * Dispatch the fetch success when promise resolved 
                 */
                dispatch(fetchStorySuccess(id, response.payload));
            });
        },
        getMainStories: () => {
            promiseInterceptor(dispatch, fetchMainStories())
            .then(response => {
                dispatch(fetchMainStoriesSuccess(response.payload));
            })
        },
        getHomepageProducts: () => {
            promiseInterceptor(dispatch, fetch_homepage_products())
            .then(response => {
                dispatch(fetch_homepage_products_success(response.payload));
            })
        },
        getTeaser: () => {
            promiseInterceptor(dispatch, fetch_teaser())
            .then(response => {
                dispatch(fetch_teaser_success(response.payload));
            })
        },
        getOtherStories: () => {
            promiseInterceptor(dispatch, fetchOtherStories())
            .then(response => {
                dispatch(fetchOtherStoriesSuccess(response.payload));
            })
        }
    }
}

const HomepageContainer = connect(mapStateToProps, mapDispatchToProps)(Homepage);
export default HomepageContainer;