import * as TYPE from 'actions/types';

const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE: {
      const { inputValue } = action.payload.moduleState || {};
      return inputValue !== undefined ? inputValue : state;
    }
    default:
      return state;
  }
};
