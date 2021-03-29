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
      return { ...initialState, ...action.payload.storageData.history };
    case TYPE.ADD_TRANSACTION_DATAPACKET:
      const newTransactions = {
        ...state,
        transactions: { ...state.transactions, ...action.payload },
      };
      return newTransactions;
    case TYPE.ADD_TIMESTAMP_DATAPACKET:
      const newTimestamps = {
        ...state,
        timestamps: { ...state.timestamps, ...action.payload },
      };
      return newTimestamps;
    case TYPE.REMOVE_SAVE_DATA:
      return initialState;
    default:
      return state;
  }
};
