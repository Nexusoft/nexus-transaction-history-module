import { combineReducers } from 'redux';

import modal from './modal';
import main from './main';
import user from './user';
import history from './history';

export default combineReducers({
  main,
  modal,
  user,
  history,
});
