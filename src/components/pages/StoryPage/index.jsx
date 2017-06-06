import React, { Component } from 'react';
import Maybe from './../../../utils/fp/Maybe'
import R from 'ramda';
import RelatedStories from './RelatedStories'

/**
 * Create a curry function from our 2 parameter function, so that we will be able
 * to use it in two steps.
 */
const storyLoaded = R.curry((stories,id) => stories.find(s => +s.id === +id)); 

class StoryPage extends Component {

    componentWillMount(){
        /**
         * Partially aplication function to check if story was loaded,
         * We pass only 'stories' parameter at first.
         */
        const storyLoadedPA = storyLoaded(this.props.stories);

        /**
         * Create a Maybe monad to check if ID was passed
         */
        this.storyID =  Maybe.of(this.props).map(R.path(['match','params','id']));
        
        /**
         * Check if story was loaded to state
         */
        this.storyID.map(storyLoadedPA)
        .orElse(this.storyID.map(this.props.getStory));

        this.props.getRelatedStories(this.storyID.join())
        
        
    }
    componentWillReceiveProps(nextProps){
        /**
         * If page id was changed, update 'storyID' value (will make the page re-render)  
         */
        Maybe.of(nextProps).map(R.path(['match','params','id'])).map(id => {
            if(+this.storyID.join() !== +id){
                 this.storyID = this.storyID.map(()=>id);
            }
            return this.storyID.join();
        })
    }
    render(){
        const pageStory = this.storyID.map(storyLoaded(this.props.stories)).join(); //(storyLoaded(this.props.stories)(this.storyID.join()));
        if(pageStory){
            /**
             * For the sake of example we are taking all stories that are not this one
             */
            const otherStories = this.props.stories
            .filter(s => +s.id !== +this.storyID.join())
            .reduce((acc, v, i) => {
                return i < 3 ? acc.concat(v):acc;
            },[]);
            
            /**
             * Using ES6 Object destructuring to get object properties 
             */
            const {title, subtitle, content} = pageStory;

            return(
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <img src={process.env.PUBLIC_URL + pageStory.imageURL} alt="" style={ {'width' : '100%'} } />
                            <h1>{title}</h1>
                            <h3>{subtitle}</h3>
                            <hr />                 
                            <div dangerouslySetInnerHTML={{__html:content}}></div>
                        </div>
                        <div className="col-sm-4">
                            {/* Load additional stories */}
                            <RelatedStories stories={otherStories} />
                        </div>
                    </div>
                </div>)
        }
        return (<div>loading...</div>)
    }
}
export default StoryPage;