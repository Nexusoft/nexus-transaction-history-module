import * as TYPE from 'actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE: {
      const { showingConnections } = action.payload.storageData;
      return showingConnections !== undefined ? showingConnections : state;
    }

    default:
      return state;
  }
};
