import React, { Component } from 'react';
import Story from './../../../shared/segments/Story';

export default class OtherStories extends Component{

    render(){
        let stories;
        if(this.props.otherStories && !!this.props.otherStories.length){
            stories = this.props.otherStories.map((story) => {
                const key = "otherStory-" + story.id;
                return (<div key={key} className="col-sm-2 small-thumb"><Story story={story} /></div>)
            });
        }

        return(
            <section>
                <div className="row">
                    <div className="col-sm-12">
                    <h2>Other Topics</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                    <div className="row">
                        {stories}
                    </div>
                    </div>
                </div>
            </section>
        )
    }
}