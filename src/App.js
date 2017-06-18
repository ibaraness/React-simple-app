import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css';
import Header from './components/shared/Header';
import HomepageContainer from './containers/HomepageContainer';
import SpinnerContainer from './containers/SpinnerContainer';
import StoryPageContainer from './containers/StoryPageContainer';
import GeneralModalConatiner from './containers/GeneralModalContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={HomepageContainer} />
          <Route path="/story/:id" component={StoryPageContainer} />  
          <SpinnerContainer />
          <GeneralModalConatiner />
        </div>
      </Router>
    );
  }
}

export default App;
