import React, { Component } from 'react';
import MainStories from './MainStories2';
import HomepageProducts from './HomepageProducts';
import Teaser from './../../shared/segments/Teaser';
import OtherStories from './OtherStories';
import Maybe from './../../../utils/fp/Maybe'
import R from 'ramda';

export default class Homepage extends Component {

  componentWillMount(){

    /**
     * Partial application to load homepage data
     */
    const getHomepageData = R.partial((getHomepageDataAction, loaded) => {
      if(!loaded){
            getHomepageDataAction();
        }
      return loaded;
    },[this.props.getHomepageData]);

    /**
     * Implemented a functional programming Maybe functor. Using the Maybe we can check if
     * the 'loaded' state was set, and if it's equal to true. We so it without having to create a deep if statements.
     */
    Maybe.of(this.props).map(R.path(['homepage','loaded'])).orElse(false).map(getHomepageData);
  }

  render(){

    /**
     * Partial application to get teaser story
     */
    const setTeaserData = R.partial((stories, id) => {
      return stories.find(s => +s.id === +id) || {};
    }, [this.props.stories]);

    /**
     * Teaser Maybe functor. will get the correct story or empty object instead
     */
    const teaser = Maybe.of(this.props.teaser).map(t => t[0]).map(setTeaserData).orElse({}).join();


    return(
        <div className="container">

          {/* MAIN THREE STORIES START */}
          <MainStories stories={this.props.stories} mainStories ={this.props.mainStories} />
          {/* MAIN THREE STORIES END */}

          <div className="row rowSpacer hidden-xs"></div>
          <hr />

          {/* NEW PRODUCTS START */}
          <HomepageProducts homepageProducts={this.props.homepageProducts} />
          {/* NEW PRODUCTS END */}

          {/* TEASER START */}
          <div className="row hidden-xs">
            <Teaser teaser={teaser} />
          </div>
          {/* TEASER END */}

          <div className="row rowSpacer hidden-xs"></div>
          <hr />
          <OtherStories stories={this.props.stories} otherStories={this.props.otherStories} />
        </div>
    )
  }
}
