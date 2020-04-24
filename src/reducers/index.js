import initialized from './initialized';
import theme from './theme';
import coreInfo from './coreInfo';
import ui from './ui';
import user from './user';
import history from './history';

const {
  libraries: {
    Redux: { combineReducers },
  },
} = NEXUS;

export default function createReducer() {
  return combineReducers({
    initialized,
    theme,
    coreInfo,
    ui,
    user,
    history,
  });
}
