import * as TYPE from 'actions/types';

export const SetSettings = (settings) => async (dispatch) => {
  dispatch({ type: TYPE.SET_SETTINGS, payload: settings });
};
