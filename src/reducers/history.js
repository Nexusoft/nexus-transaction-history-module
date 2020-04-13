import * as TYPE from 'actions/types';

const {
  utilities: { updateStorage },
} = NEXUS;

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE:
      return action.payload.storageData;
    case TYPE.ADD_TRANSACTION_DATAPACKET:
      const newData = [...state, action.payload];
      updateStorage(newData);
      return newData;
    default:
      return state;
  }
};
