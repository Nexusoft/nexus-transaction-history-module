import * as TYPE from 'actions/types';

const initialState = {
  busyGatheringInfo: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_GATHERING_INFO:
      return {
        ...state,
        busyGatheringInfo: action.payload,
      };
    default:
      return state;
  }
};
