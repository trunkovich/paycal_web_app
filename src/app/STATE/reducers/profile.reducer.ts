/**
 * Created by TrUnK on 06.01.2017.
 */
import * as _ from 'lodash';

import * as profileActions from '../actions/profile.actions';
import {Employee} from '../models/employee.model';

export interface ProfileState {
  employee: Employee | null;
  errorMsg: string | null;
}

const initialProfileState = {
  employee: null,
  errorMsg: null
};

export function profileReducer(state: ProfileState = initialProfileState, action: profileActions.Actions): ProfileState {
  switch (action.type) {
    case profileActions.ActionTypes.CLEAN_PROFILE: {
      return _.cloneDeep(initialProfileState);
    }
    case profileActions.ActionTypes.GET_USER_PROFILE_SUCCESS: {
      return saveRedirectUrlHandler(state, action);
    }
    case profileActions.ActionTypes.GET_USER_PROFILE_FAIL: {
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
function saveRedirectUrlHandler(state: ProfileState, action: profileActions.GetUserProfileSuccessAction) {
  let newState = _.cloneDeep(state);
  newState.employee = _.cloneDeep(action.payload);
  newState.errorMsg = null;
  return newState;
}

function setErrorMsgHandler(state: ProfileState, action: profileActions.GetUserProfileFailAction) {
  let newState = _.cloneDeep(state);
  newState.errorMsg = action.payload;
  return newState;
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getMyProfile = (state: ProfileState) => state.employee;
export const getMyProfileErrorMsg = (state: ProfileState) => state.errorMsg;
