import { connect } from 'react-redux';
import { 
    fetchStory, 
    fetchStorySuccess,
    fetchRelatedStories,
    fetchRelatedStoriesSuccess 
} from './../../actions/story';
import StoryPage from './../../components/pages/StoryPage';
import { promiseInterceptor } from './../../utils/promise-interceptor';
import Maybe from './../../utils/fp/Maybe';
import { openErrorModal } from './../../actions/modals';

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
    }
}

/**
 * Turn actions to properties
 */
const mapDispatchToProps = dispatch => {
    return {
        getStory: id => {
            console.log("Fetching story!");
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
                 * Check that story was successfully loaded (...or unsuccessfully)
                 */
                Maybe.of(response.error).map(err => {
                    dispatch(openErrorModal("Error", "Story was not found!"))
                    return err;
                })
                /**
                 * Dispatch the fetch success when promise successfully resolved 
                 */
                .orElse(false).map(bol => {
                    if(!bol){
                        dispatch(fetchStorySuccess(id, response.payload));
                    }
                    return bol;
                });
            });
        },
        getRelatedStories: id => {
            promiseInterceptor(dispatch, fetchRelatedStories(id,3))
            .then((response) => {
                dispatch(fetchRelatedStoriesSuccess(response.payload));
            })
        }
    }
}

const StoryPageContainer = connect(mapStateToProps, mapDispatchToProps)(StoryPage);
export default StoryPageContainer;