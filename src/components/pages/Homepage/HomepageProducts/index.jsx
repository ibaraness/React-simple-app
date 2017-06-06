import React, { Component } from 'react';
import Product from './../../../shared/segments/Product';

class HomepageProducts extends Component {
  render(){

    let products;
    if(this.props.homepageProducts){
      products = this.props.homepageProducts.map((product, index) => {
        return(<div key={index} className="col-xs-6 col-sm-3">
                  <Product product={product} />
                </div>)
      })
    }

    return(
      <section>
      <div className="row">
            <div className="col-sm-12">
              <h2>New Producs</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                {products}
              </div>
            </div>
          </div>
      </section>
    );
  }
}
export default HomepageProducts;
