import * as TYPE from 'actions/types';
const {
  utilities: { apiCall },
} = NEXUS;

export const GetUserAccounts = () => async (dispatch) => {
  try {
    const result = await apiCall('users/list/accounts');
    dispatch({ type: TYPE.SET_USER_ACCOUNTS, payload: result });
  } catch (error) {
    console.error(error);
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const GetAccountTransactions = (accounts) => async (dispatch) => {
  try {
    console.log(accounts);
    let transactions = [];
    if (accounts) {
      await asyncForEach(accounts, async (account) => {
        if (account.token === '0') {
          const result = await apiCall('finance/list/account/transactions', {
            address: account.address,
          });
          console.log(result);
          result.forEach((element) => {
            transactions = transactions.concat(element.contracts);
          });
        }
      });

      dispatch({ type: TYPE.SET_ACCOUNT_TRANSACTIONS, payload: transactions });
    }
  } catch (error) {
    console.error(error);
  }
};

export const UpdateUserInfo = (userStatus) => async (dispatch) => {
  try {
    dispatch({ type: TYPE.UPDATE_USER_INFO, payload: userStatus });
  } catch (error) {
    console.error(error);
  }
};
