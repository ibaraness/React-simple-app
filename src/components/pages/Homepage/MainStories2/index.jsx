import React, { Component } from 'react';
import Story from './../../../shared/segments/Story';
import './main-stories.css';

class MainStories extends Component {

  render(){
    let stories = [];
    if(this.props.mainStories && !!this.props.mainStories.length){
       stories = this.props.mainStories.map((storyId) => {
          const key = "mainStory-" + storyId;
          const storyData = this.props.stories.find(s => +s.id === +storyId) || {};
          return (<div key={key} className="col-sm-4 "><Story story={storyData} /></div>)
       })
    }
    
    return(
      <section>
      {/* MAIN THREE STORIES START */}
      <div className="row">
        <div className="col-sm-12">
          <h1>Welcome to my ReactJS App</h1>
          <h2>Today's' Topics</h2>
        </div>
      </div>
      <div className="row">
      {/* <!--// TODO: loop through 3 main stories--> */}
        {stories}
      </div>
      {/* MAIN THREE STORIES END */}
      </section>
    );
  }
}
export default MainStories;
