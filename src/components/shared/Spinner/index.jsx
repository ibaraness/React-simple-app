import React, { Component } from 'react';
import './spinner.css';

class Spinner extends Component {
    render(){
        let showSpinner = 'hide';
        if(this.props.spinner){
            showSpinner = '';
        }
        return(
            <div className={"spinner " + showSpinner}>
                <div className="spinner-screen">
                    <div className="spinner-content">
                        <span>Loding...</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default Spinner;