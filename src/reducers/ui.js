import * as TYPE from 'actions/types';

const initialState = {
  busyGatheringInfo: false,
  fromQuery: '',
  toQuery: '',
  timeSpan: null,
  operation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_GATHERING_INFO:
      return {
        ...state,
        busyGatheringInfo: action.payload,
      };
    case TYPE.SET_FROM_QUERY:
      return {
        ...state,
        fromQuery: action.payload,
      };
    case TYPE.SET_TO_QUERY:
      return {
        ...state,
        toQuery: action.payload,
      };
    case TYPE.SET_TIMESPAN:
      return {
        ...state,
        timeSpan: action.payload,
      };
    case TYPE.SET_OPERATION:
      return {
        ...state,
        operation: action.payload,
      };
    default:
      return state;
  }
};
