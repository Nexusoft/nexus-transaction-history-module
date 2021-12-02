import * as TYPE from './types';

export const initialize = (data) => ({
  type: TYPE.INITIALIZE,
  payload: data,
});

export const updateCoreInfo = (coreInfo) => ({
  type: TYPE.UPDATE_CORE_INFO,
  payload: coreInfo,
});

export const updateTheme = (theme) => ({
  type: TYPE.UPDATE_THEME,
  payload: theme,
});

export const updateUserStatus = (userStatus) => ({
  type: TYPE.UPDATE_USER_STATUS,
  payload: userStatus,
});

export const OpenModal = (modal) => ({
  type: TYPE.OPEN_MODAL,
  payload: modal,
});

export const CloseModal = () => ({
  type: TYPE.CLOSE_MODAL,
  payload: {},
});
