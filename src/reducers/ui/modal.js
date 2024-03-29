import * as TYPE from 'actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.OPEN_MODAL:
      return action.payload;
    case TYPE.CLOSE_MODAL:
      return {};
    default:
      return state;
  }
};
