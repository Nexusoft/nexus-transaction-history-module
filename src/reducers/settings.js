import * as TYPE from 'actions/types';

const initialState = {
  nexusApiLimit: 100,
  transactionsPerPage: 10,
  unixTime: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
