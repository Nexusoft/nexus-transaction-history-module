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
      console.log(state);
      const newTransactions = {
        ...state,
        transactions: { ...state.transactions, ...action.payload },
      };
      console.log(newTransactions);
      updateStorage(newTransactions);
      return newTransactions;
    case TYPE.ADD_TIMESTAMP_DATAPACKET:
      console.log(state);

      const newTimestamps = {
        ...state,
        timestamps: { ...state.timestamps, ...action.payload },
      };
      updateStorage(newTimestamps);
      return newTimestamps;
    default:
      return state;
  }
};
