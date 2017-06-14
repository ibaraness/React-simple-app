import React, { Component } from 'react';
import MainStories from './MainStories2';
import HomepageProducts from './HomepageProducts';
import Teaser from './../../shared/segments/Teaser';
import OtherStories from './OtherStories';

export default class Homepage extends Component {

  componentWillMount(){
    // this.props.getMainStories();
    // this.props.getHomepageProducts();
    // this.props.getTeaser();
    // this.props.getOtherStories();

    this.props.getHomepageData()
  }

  render(){
    return(
        <div className="container">

          {/* MAIN THREE STORIES START */}
          <MainStories mainStories ={this.props.mainStories} />
          {/* MAIN THREE STORIES END */}

          <div className="row rowSpacer hidden-xs"></div>
          <hr />

          {/* NEW PRODUCTS START */}
          <HomepageProducts homepageProducts={this.props.homepageProducts} />
          {/* NEW PRODUCTS END */}

          {/* TEASER START */}
          <div className="row hidden-xs">
            <Teaser teaser={this.props.teaser} />
          </div>
          {/* TEASER END */}

          <div className="row rowSpacer hidden-xs"></div>
          <hr />
          <OtherStories otherStories={this.props.otherStories} />
        </div>
    )
  }
}
