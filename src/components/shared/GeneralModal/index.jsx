import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './general-modal.css';

class GeneralModal extends Component {

    constructor(props){
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.closeModal();
    }

    render(){
        const modalState = this.props.modals['show'] || false;
        const { title, content, modalType } = this.props.modals['data'];

        return(
            <Modal show={modalState} onHide={this.close}>
                <Modal.Header bsClass="modal-header" closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div dangerouslySetInnerHTML={{__html:content}}></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

GeneralModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    modals: PropTypes.object.isRequired
}

export default GeneralModal;