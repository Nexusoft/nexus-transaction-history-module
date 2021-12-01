import * as TYPE from 'actions/types';
const {
  utilities: { apiCall },
} = NEXUS;

export const SetBusyGatheringInfo = (isBusy) => async (dispatch) => {
  dispatch({ type: TYPE.SET_GATHERING_INFO, payload: isBusy });
};

export const setFromQuery = (search) => async (dispatch) => {
  console.log(search);
  dispatch({
    type: TYPE.SET_FROM_QUERY,
    payload: search,
  });
};

export const setToQuery = (search) => async (dispatch) => {
  console.log(search);
  dispatch({
    type: TYPE.SET_TO_QUERY,
    payload: search,
  });
};

export const setTimeSpan = (time) => async (dispatch) => {
  dispatch({
    type: TYPE.SET_TIMESPAN,
    payload: time,
  });
};

export const setOperation = (op) => async (dispatch) => {
  dispatch({
    type: TYPE.SET_OPERATION,
    payload: op,
  });
};
