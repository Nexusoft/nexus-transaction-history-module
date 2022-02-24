import createReducer from './reducers';
import storageMiddleware from 'middlewares/storageMiddleware';
import stateMiddleware from 'middlewares/stateMiddleware';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';

export default function configureStore() {
  const middlewares = [
    storageMiddleware(({ settings, history }) => {
      return { settings, history };
    }),
    stateMiddleware(({ ui, user, history }) => {
      return { ui, user, history };
    }),
    thunk,
  ];
  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;

  const store = createStore(createReducer(), composeEnhancers(...enhancers));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer());
    });
  }

  return store;
}
