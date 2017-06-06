import React, { Component } from 'react';
import './spinner.css';

class Spinner extends Component {
    render(){
        let showSpinner = 'hide';
        if(this.props.spinner){
            showSpinner = '';
        }
        const spinnerStyle = {
        'background':'url(' + process.env.PUBLIC_URL + '/assets/images/page_loader.svg) center no-repeat'
        };
        return(
            <div className={"spinner " + showSpinner}>
                <div className="spinner-screen">
                    <div className="spinner-content" style={spinnerStyle}>
                    </div>
                </div>
            </div>
        );
    }
}
export default Spinner;