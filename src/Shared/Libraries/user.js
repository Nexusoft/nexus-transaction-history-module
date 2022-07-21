import * as TYPE from 'actions/types';
const {
  utilities: { apiCall, rpcCall },
} = NEXUS;

export const GetUserAccounts = () => async (dispatch) => {
  try {
    const result = await apiCall('finance/list/all', {
      where: 'object.token=0',
    });
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

export const GetAccountTransactions = (accounts, limit) => async (dispatch) => {
  try {
    let transactions = [];
    if (accounts) {
      await asyncForEach(accounts, async (account) => {
        if (account.token === '0') {
          const result = await apiCall('finance/transactions/all', {
            address: account.address,
            limit: limit || 100,
          });
          result.forEach((element) => {
            const temp = element.contracts
              .map((e) => {
                return { ...e, txid: element.txid };
              })
              .filter((e) => e.OP != 'CREATE');

            transactions = transactions.concat(temp);
          });
        }
      });
      let legacyAddressTransactions = [];
      try {
        legacyAddressTransactions = await getLegacyTransactions(transactions);
      } catch (error) {}
      dispatch({
        type: TYPE.SET_ACCOUNT_TRANSACTIONS,
        payload: transactions.concat(legacyAddressTransactions),
      });
    }
  } catch (error) {
    console.error(error);
  }
};

/*
LEGACY
account: "default"
address: "2RrNArsgVDv2z6Eqd2vrHtWqBYtBKjrKXCqBedEeNUCyKboEcfS"
category: "receive"
amount: 0.001
confirmations: 141275
blockhash: "01037ef5960f727bb694c895b03336d6a86d99bfcec7506531873d7fa9e388b00f93a52559e81705b4884372fb3235698e9ce866239092489eeec1c227eff0c97a5a1799082072872c75db203237d8fe6dba8fe1a96e1bebe27ced60340f7b34f0a05e1054231d8bc7d1e07758a9bad0db7a982c041a5f0cf1d8c127bd4b118c"
blockindex: -1
txid: "01c48ccdd95e125acbca52402c9119d1d98a01fc6820d2f8480e172bd6a9f7e7e3f655e52ffd0124f47ea9f52b0e370f1c6b8d1c632e9f8e823e58b7ad226126"
time: 1580243076


NEW
id: 0
OP: "LEGACY"
from: "8Byqcm1uXB7JovRevfVWKXoPMcg77VbhC2g36M4zneEgCkDZK9m"
from_name: "default"
to: "2QyPcqhiU5N9VepTjkkd2W6mh8JUh66LkDnRHeRnQwrUJYfVZh7"
amount: 3500
token: "0"
token_name: "NXS"
txid: "0196c9b7c05400e82551ea51e10bae874e292ecd42e0652082e1198060db1ecf17f86fb61d835c16216fbab31522ed6ca8b5a9c373ee185ca9cf09489832e767"
timestamp: 1587237565
fiatAmount: 569.1

*/

async function getLegacyTransactions(tritiumTransactions) {
  const result = await rpcCall('listtransactions', [['*', 9999, 0]]);
  const reFormat = result
    .map((e) => ({
      OP: 'LEGACY',
      txid: e.txid,
      amount: e.amount,
      from: e.account + ' (Legacy)',
      to: e.address,
      token: '0',
      token_name: 'NXS',
      timestamp: e.time,
    }))
    .filter((e) => !tritiumTransactions.some((a) => a.txid == e.txid));
  return reFormat;
}

export const UpdateUserInfo = (userStatus) => async (dispatch) => {
  try {
    dispatch({ type: TYPE.UPDATE_USER_INFO, payload: userStatus });
  } catch (error) {
    console.error(error);
  }
};
