
import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

import './story-segment.css';

class Story extends Component {
  render(){

    /**
     * We first create a loader background image, incase our data isn't ready yet,
     * When data is ready will replace the loader background with the real image.
     */
    let storyImageStyle = {
      'background':'url(' + process.env.PUBLIC_URL + '/assets/images/loader.gif) center no-repeat #999'
    };
    if(this.props.story.imageThumbURL){
      storyImageStyle = {
        'background':'url(' + process.env.PUBLIC_URL + this.props.story.imageThumbURL + ') center no-repeat',
        'backgroundSize':'cover'
      };
    }    

    const { title, subtitle, id } = this.props.story;

    return(
      <Link to={"/story/" + id}>
        <div className="story-image" style={ storyImageStyle }></div>
        <h4 className="story_short_title">{ title }</h4>
        <p className="story_short">{ subtitle }</p>
      </Link>
    )
  }
}
export default Story;
