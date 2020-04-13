import * as TYPE from 'actions/types';
const {
  utilities: { apiCall },
} = NEXUS;

export const getTransactionDataPacket = (txID, timestamp, fiat) => async (
  dispatch
) => {
  try {
    const txInfo = await getTransactionMoreInfo(txID);
    const historyInfo = await getHistoricInfo(txInfo.timestamp);
    const waitTwoSeconds = await setTimeout(() => {
      return true;
    }, 2000);
    const dataPacket = {
      txID: {
        timestamp: txInfo.timestamp,
        fiat: {
          unitPrice: historyInfo.unitPrice,
          totalValue: historyInfo.unitPrice * txInfo.ammount,
        },
      },
    };
    dispatch({ type: TYPE.ADD_TRANSACTION_DATAPACKET, payload: dataPacket });
  } catch (error) {
    console.error(error);
  }
};

const getTransactionMoreInfo = (txID) => async () => {
  try {
    const result = await apiCall('gettx');
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getHistoricInfo = (timestamp, fiat) => async () => {
  try {
    //check store for previous price
    const result = await getURL('url');
    return result;
  } catch (error) {
    console.error(error);
  }
};
