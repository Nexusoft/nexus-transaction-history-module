import configureStore from './configureStore';
import App from './App';
import {
  initialize,
  updateCoreInfo,
  updateTheme,
  updateUserStatus,
} from './actions/actionCreators';
import { Provider } from 'react-redux';

const store = configureStore();

const {
  libraries: { React, ReactDOM },
  utilities: { onceInitialize, onWalletDataUpdated },
} = NEXUS;

onceInitialize((data) => {
  store.dispatch(initialize(data));
});

onWalletDataUpdated(({ coreInfo, theme, userStatus }) => {
  if (coreInfo) store.dispatch(updateCoreInfo(coreInfo));
  if (theme) store.dispatch(updateTheme(theme));
  //if null == not logged in
  if (userStatus) store.dispatch(updateUserStatus(userStatus));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
