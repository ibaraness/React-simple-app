
import { connect } from 'react-redux';
import { 
    fetchMainStories, 
    fetchMainStoriesSuccess,
    fetchOtherStories,
    fetchOtherStoriesSuccess, 
} from './../../actions/story';
import { show_spinner, hide_spinner } from './../../actions/spinner';
import { fetch_homepage_products,fetch_homepage_products_success } from './../../actions/product'
import { fetch_teaser, fetch_teaser_success } from './../../actions/teaser';
import Homepage from './../../components/pages/Homepage';

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
        /**
         * Load all homepage data together using Promise.all method
         */
        getHomepageData: () => {
            dispatch(show_spinner());
            Promise.all([
                dispatch(fetchMainStories()),
                dispatch(fetch_homepage_products()),
                dispatch(fetch_teaser()),
                dispatch(fetchOtherStories())
                ]).then(response => {
                    //TODO: Catch errors
                    dispatch(hide_spinner());
                    dispatch(fetchMainStoriesSuccess(response[0].payload));
                    dispatch(fetch_homepage_products_success(response[1].payload));
                    dispatch(fetch_teaser_success(response[2].payload));
                    dispatch(fetchOtherStoriesSuccess(response[3].payload));
                });
        }
    }
}

const HomepageContainer = connect(mapStateToProps, mapDispatchToProps)(Homepage);
export default HomepageContainer;