import * as TYPE from 'actions/types';
const {
  utilities: { apiCall },
} = NEXUS;

export const SetBusyGatheringInfo = (isBusy) => async (dispatch) => {
  dispatch({ type: TYPE.SET_GATHERING_INFO, payload: isBusy });
};
