import {APP} from './actionsTypes';

export const ROOT_SPLASH = 'splash';
export const ROOT_INTRO = 'introduction';
export const ROOT_OUTSIDE = 'outside';
export const ROOT_INSIDE = 'inside';
export const ROOT_LOADING = 'loading';
export const ROOT_SIGNUP_PROFILE = 'signup_profile';
export const ROOT_THANK_YOU = 'thank_you';
export const ROOT_VERIFY_EMAIL = 'verify_email';

export function appStart({root, ...args}) {
  return {
    type: APP.START,
    root,
    ...args,
  };
}

export function appReady() {
  return {
    type: APP.READY,
  };
}

export function appInit() {
  return {
    type: APP.INIT,
  };
}

export function appInitLocalSettings() {
  return {
    type: APP.INIT_LOCAL_SETTINGS,
  };
}

export function setMasterDetail(isMasterDetail) {
  return {
    type: APP.SET_MASTER_DETAIL,
    isMasterDetail,
  };
}

export function setRoute(routeName) {
  return {
    type: APP.SET_ROUTE,
    routeName,
  };
}
