import React from 'react';
import Story from './../../../../components/shared/segments/Story';

const RelatedStories = (props) => {
    const a = 'my story';
    const stories = props.stories.map((story, idx) => (
        <div key={"relatedStory" + idx} className="col-xs-6 col-sm-12">
              <Story story={story} />
        </div>
    ))
    return(
        <div>
            {/*<!--[AD START]-->*/}
            <figure className="promotional-ad">
                <a href="http://www.google.com">
                    <img src={process.env.PUBLIC_URL + "/assets/images/thumbs/coffee-2306471_1920.jpg"}  alt="" style={{'width':'100%'}} />
                </a>
                <figcaption className="promotional-ad-caption">Promotional Ad</figcaption>
            </figure>
            {/*<!--[AD END]-->*/}
            <div className="other-stories">
                <h4>Other Stories you might like:</h4>
                <div className="row">
                    {stories}
                </div>
            </div>
        </div>
    )
}

export default RelatedStories