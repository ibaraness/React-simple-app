import { connect } from 'react-redux';
import { hide_spinner, show_spinner } from './../../actions/spinner';
import Spinner from './../../components/shared/Spinner';

/**
 * Map homepage state to prop.
 * Turn state to properties
 */
const mapStateToProps = state => {
    return {
        spinner: state.spinner
    }
}

/**
 * Map dispath to props
 * Turn actions to properties
 */
const mapDispatchToProps = dispatch => {
    return {
        hide: () => {
            dispatch(hide_spinner());
        },
        show: () => {
            dispatch(show_spinner());
        }
    }
}

const SpinnerContainer = connect(mapStateToProps, mapDispatchToProps)(Spinner);
export default SpinnerContainer;