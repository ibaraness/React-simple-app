import React, { Component } from 'react';


class Teaser extends Component {

  render(){

    // if(!this.props.teaser.content){
    //     return(<p>Loading!</p>)
    // }
    const {title, subtitle, teaserText, imageThumbURL } = this.props.teaser;
    // const productImageStyle = {
    //    'background':'url(' + process.env.PUBLIC_URL + imageThumbURL + ') center no-repeat',
    //     'backgroundSize':'cover'
    // };
    /**
     * We first create a loader background image, incase our data isn't ready yet,
     * When data is ready will replace the loader background with the real image.
     */
    let storyImageStyle = {
      'background':'url(' + process.env.PUBLIC_URL + '/assets/images/loader.gif) center no-repeat #999'
    };
    if(this.props.teaser.imageThumbURL){
      storyImageStyle = {
        'background':'url(' + process.env.PUBLIC_URL + this.props.teaser.imageThumbURL + ') center no-repeat',
        'backgroundSize':'cover'
      };
    }    

    return(
        <section>
            <div className="col-sm-5">
                <h2 className="teaser_title">{title}</h2>
                <p className="teaser-text">{subtitle}</p>
                <button type="button" className="btn btn-primary">Read it now!</button>
                <hr />
                <div dangerouslySetInnerHTML={{__html:teaserText}} ></div>
            </div>
            <div className="col-sm-7">
                <div className="story-image" style={storyImageStyle}></div>
            </div>
        </section>
    )
  }
}
export default Teaser;