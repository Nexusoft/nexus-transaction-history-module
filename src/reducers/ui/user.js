import * as TYPE from 'actions/types';

const initialState = {
  accounts: null,
  transactions: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_USER_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };

    case TYPE.SET_ACCOUNT_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case TYPE.REMOVE_SAVE_DATA:
      return { ...state, transactions: null };
    default:
      return state;
  }
};
