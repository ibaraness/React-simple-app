
import React, { Component } from 'react';
import ReviewStars from './../ReviewStars';
import './product.css';

class Product extends Component {
  render(){

    const productImageStyle = {
      'background':'url(' + process.env.PUBLIC_URL + this.props.product.imageThumbURL + ') center no-repeat',
      'backgroundSize':'cover'
    };

    const {description, reviewCount, rating} = this.props.product;

    return(
      <div>
        <a href="/">
            <div className="product-image" style={productImageStyle}></div>
        </a>
        <div>
            <a href="/"><h4 dangerouslySetInnerHTML={{__html:description}}></h4></a>
            <div className="reviews">
              <ReviewStars rating={rating}/>
                <span className="review-description">{reviewCount} reviews</span>
            </div>
        </div>
    </div>
    )
  }
}
export default Product;
