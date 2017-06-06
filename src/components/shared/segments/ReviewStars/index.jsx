
import React, { Component } from 'react';

import './review-stars.css';

class ReviewStars extends Component {

  /**
   * In order to display 5 stars (full or empty) next to each product,
   * we need a 5 items array, where each item in it represent a star (full, half or empty star).
   * 
   * This method Takes a number between 0-5, and returns an array of numbers.
   *  - 1 represents a full star.
   *  - 0.5 represents an half full (or half empty) star.
   *  - 0 represents an empty star.
   */
   getRatingsStarsArray(ratingNumber){
    /**
     * Prepare a 5 items array. our stars container
     */
    const stars = new Array(5);

    /**
     * Get a whole number version of the reviews, 
     * so that later we can extract half value (if exists)
     */
    const intRating = Math.floor(ratingNumber);

    /**
     * Get our half star (if exists), by substracting the whole ratings
     * value from the original one.
     */
    let halfs = ratingNumber - intRating;

    /**
     * Loop through the array and fill it with correct values
     */
    for(let i = 0, n = 1; i <= 4; i++, n++){
      if(n <= intRating){
        stars[i] = 1
      } else {
        stars[i] = halfs;
        halfs = +0;
      }
    }
    return stars;
  }

  render(){

    const ratingStarsArr = this.getRatingsStarsArray(this.props.rating); //[1,1,1,0.5,0];
    const ratingStars = ratingStarsArr.map((starValue, index) => {
        if(starValue === 1){
            return(<span key={index} className="glyphicon review-star glyphicon-star"></span>);
        }else if( starValue === 0.5) {
            return(<span key={index} className="glyphicon review-star glyphicon-star-half "></span>);
        }else {
            return(<span key={index} className="glyphicon review-star glyphicon-star-empty"></span>);
        }
    })

    return(
      <div>
          {ratingStars}
    </div>
    )
  }
}
export default ReviewStars;
