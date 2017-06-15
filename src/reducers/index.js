//import cart from './cart';
import { stories, mainStories, otherStories } from './stories';
import { homepageProducts } from './products';
import { spinner } from './spinner';
import { teaser } from './teaser';
import { homepage } from './homepage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  spinner,
  mainStories,
  stories,
  homepage,
  homepageProducts,
  teaser,
  otherStories
});

export default rootReducer;
