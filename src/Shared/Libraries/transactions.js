import * as TYPE from 'actions/types';
const {
  utilities: { apiCall },
} = NEXUS;

export const getTransactionDataPacket = (
  transactions,
  timestamp,
  fiat
) => async (dispatch, getState) => {
  console.log('gettransctionsDataPacekets');
  try {
    console.log('aadsd');
    asyncForEach(transactions, dispatch, getState, async (tx, {}, {}) => {
      console.log(tx);
      const txID = tx.txid;
      console.log('gettransctionDataPaceket');
      const past = getState().history.transactions[txID];
      if (past) {
        return;
      }
      const txInfo = await getTransactionMoreInfo(txID);
      console.log(txInfo);
      console.log(dispatch);
      console.log(getState);
      const historyInfo = await getHistoricInfo(
        txInfo.timestamp,
        fiat,
        dispatch,
        getState
      );
      console.log(historyInfo);
      console.log(historyInfo[txInfo.timestamp]);
      console.log(historyInfo[txInfo.timestamp][fiat]);
      const waitTwoSeconds = await delay(2000);
      console.log(waitTwoSeconds);
      let dataPacket = {};
      dataPacket[txID] = {
        timestamp: txInfo.timestamp,
        fiat: {
          unitPrice: historyInfo[txInfo.timestamp][fiat].unitPrice,
          totalValue: historyInfo[txInfo.timestamp][fiat].unitPrice * tx.amount,
        },
      };

      console.error(dataPacket);
      dispatch({
        type: TYPE.ADD_TRANSACTION_DATAPACKET,
        payload: dataPacket,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

async function asyncForEach(array, dispatch, getState, callback) {
  console.log(callback);
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array, dispatch, getState);
  }
}

async function getTransactionMoreInfo(txID) {
  try {
    const params = {
      format: 'JSON',
      hash: txID,
    };
    const result = await apiCall('ledger/get/transaction', params);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function getHistoricInfo(timestamp, fiat, dispatch, getState) {
  try {
    //check store for previous price
    //const result = await getURL('url');
    console.log(fiat);
    console.log(timestamp);
    console.log(getState);

    let dataPacket = {};
    dataPacket[timestamp] = {};
    dataPacket[timestamp][fiat] = {
      unitPrice: 2,
    };
    const prev =
      getState().history.timestamps && getState().history.timestamps[timestamp];
    if (prev) {
      dataPacket[timestamp] = prev;
      return dataPacket;
    }
    dispatch({
      type: TYPE.ADD_TIMESTAMP_DATAPACKET,
      payload: dataPacket,
    });
    return dataPacket;
  } catch (error) {
    console.error(error);
  }
}

function delay(t, val) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(val);
    }, t);
  });
}
