import GeneralModal from './../../components/shared/GeneralModal';
import { connect } from 'react-redux';
import {
    closeGeneralModal, 
} from './../../actions/modals';

/**
 * Turn state to properties
 */
const mapStateToProps = state => {
    return {
        modals: state.modals,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => {
            dispatch(closeGeneralModal());
        }
    }
}

const GeneralModalContainer = connect(mapStateToProps, mapDispatchToProps)(GeneralModal);
export default GeneralModalContainer;