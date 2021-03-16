import * as TYPE from 'actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_POP_UP:
      return [{ ...action.payload, id: `popup-${state.length}` }];
    case TYPE.CLOSE_POP_UP:
      return [];
    default:
      return state;
  }
};
