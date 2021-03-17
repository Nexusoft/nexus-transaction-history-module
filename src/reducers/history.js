import * as TYPE from 'actions/types';

const {
  utilities: { updateStorage },
} = NEXUS;

const initialState = {
  transactions: {},
  timestamps: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.INITIALIZE:
      const storage = action.payload.storageData;
      if (JSON.stringify(storage) === '{}') {
        return initialState;
      }
      return storage;
    case TYPE.ADD_TRANSACTION_DATAPACKET:
      const newTransactions = {
        ...state,
        transactions: { ...state.transactions, ...action.payload },
      };
      updateStorage(newTransactions);
      return newTransactions;
    case TYPE.ADD_TIMESTAMP_DATAPACKET:
      const newTimestamps = {
        ...state,
        timestamps: { ...state.timestamps, ...action.payload },
      };
      updateStorage(newTimestamps);
      return newTimestamps;
    case TYPE.REMOVE_SAVE_DATA:
      updateStorage({});
      return initialState;
    default:
      return state;
  }
};
