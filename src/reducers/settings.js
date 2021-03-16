import * as TYPE from 'actions/types';

const initialState = {
  nexusApiLimit: 100,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE:
      return { ...action.payload.settings, ...initialState };
    case TYPE.SET_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
