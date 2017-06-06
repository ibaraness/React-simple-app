//import cart from './cart';
import { stories, mainStories, otherStories } from './stories';
import { homepageProducts } from './products';
import { spinner } from './spinner';
import { teaser } from './teaser';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  spinner,
  mainStories,
  stories,
  homepageProducts,
  teaser,
  otherStories
});

export default rootReducer;
