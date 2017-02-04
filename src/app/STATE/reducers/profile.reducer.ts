/**
 * Created by TrUnK on 06.01.2017.
 */
import * as _ from 'lodash';

import * as profileActions from '../actions/profile.actions';
import {Employee} from '../models/employee.model';

export interface ProfileState {
  employee: Employee | null;
  errorMsg: string;
  loading: boolean;
  imageDataUri: string;
}

const initialProfileState = {
  employee: null,
  errorMsg: '',
  loading: false,
  imageDataUri: ''
};

export function profileReducer(state: ProfileState = initialProfileState, action: profileActions.Actions): ProfileState {
  switch (action.type) {
    case profileActions.ActionTypes.CLEAN_PROFILE: {
      return _.cloneDeep(initialProfileState);
    }
    case profileActions.ActionTypes.CLEAR_PROFILE_ERROR: {
      return clearProfileErrorHandler(state);
    }
    case profileActions.ActionTypes.STORE_IMAGE_DATA: {
      return storeImageDataHandler(state, action);
    }
    case profileActions.ActionTypes.GET_USER_PROFILE_SUCCESS: {
      return saveRedirectUrlHandler(state, action);
    }
    case profileActions.ActionTypes.UPDATE_PROFILE: {
      return setLoadingHanlder(state, true);
    }
    case profileActions.ActionTypes.UPDATE_PROFILE_SUCCESS: {
      return updateProfileHandler(state, action);
    }
    case profileActions.ActionTypes.GET_USER_PROFILE_FAIL:
    case profileActions.ActionTypes.UPDATE_PROFILE_FAIL: {
      return setErrorMsgHandler(state, action);
    }
    default: {
      return state;
    }
  }
}
/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
function saveRedirectUrlHandler(state: ProfileState, action: profileActions.GetUserProfileSuccessAction): ProfileState {
  let newState = _.cloneDeep(state);
  newState.employee = _.cloneDeep(action.payload);
  newState.errorMsg = null;
  return newState;
}

function storeImageDataHandler(state: ProfileState, action: profileActions.StoreImageData): ProfileState {
  let newState = _.cloneDeep(state);
  newState.imageDataUri = action.payload;
  return newState;
}

function clearProfileErrorHandler(state: ProfileState): ProfileState {
  let newState = _.cloneDeep(state);
  newState.errorMsg = null;
  return newState;
}

function setLoadingHanlder (state: ProfileState, loadingState: boolean): ProfileState {
  let newState = _.cloneDeep(state);
  newState.loading = loadingState;
  return newState;
}

function updateProfileHandler(state: ProfileState, action: profileActions.UpdateProfileSuccessAction): ProfileState {
  let newState = _.cloneDeep(state);
  let employee = _.clone(state.employee);
  employee.Email = action.payload.email ? action.payload.email : employee.Email;
  employee.MobilePhone = action.payload.mobilePhone ? action.payload.mobilePhone : employee.MobilePhone;
  employee.WorkUnitValue = action.payload.workUnitValue !== -1 ?  action.payload.workUnitValue : employee.WorkUnitValue;
  newState.employee = employee;
  return newState;
}

function setErrorMsgHandler(state: ProfileState, action: profileActions.GetUserProfileFailAction |
                                                          profileActions.UpdateProfileFailAction): ProfileState {
  let newState = _.cloneDeep(state);
  newState.errorMsg = action.payload;
  return newState;
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getMyProfile = (state: ProfileState) => state.employee;
export const getMyProfileErrorMsg = (state: ProfileState) => state.errorMsg;
export const getLoadingState = (state: ProfileState) => state.loading;
export const getUploadedImageData = (state: ProfileState) => state.imageDataUri;
