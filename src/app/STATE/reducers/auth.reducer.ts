/**
 * Created by TrUnK on 06.01.2017.
 */
import * as authActions from '../actions/auth.actions';
import * as _ from 'lodash';

import {TokenObject} from '../models/token.model';

export interface AuthState {
  token: string | null;
  authenticated: boolean;
  redirectUrl: string | null;
  errorMsg: string | null;
  loading: boolean;
}

const initialAuthState = {
  token: null,
  authenticated: false,
  redirectUrl: null,
  errorMsg: null,
  loading: false
};

export function authReducer(state: AuthState = initialAuthState, action: authActions.Actions): AuthState {
  switch (action.type) {
    case authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY:
    case authActions.ActionTypes.COMPLETE_REGISTRATION:
    case authActions.ActionTypes.RESET_PASSWORD:
    case authActions.ActionTypes.SAVE_LEAD:
    case authActions.ActionTypes.SIGN_IN: {
      return setLoadingHanlder(state, true);
    }
    case authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY_SUCCESS:
    case authActions.ActionTypes.SIGN_IN_CLEAR_ERROR:
    case authActions.ActionTypes.SAVE_LEAD_SUCCESS: {
      return setLoadingHanlder(state, false);
    }
    case authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY_FAIL:
    case authActions.ActionTypes.COMPLETE_REGISTRATION_FAIL:
    case authActions.ActionTypes.RESET_PASSWORD_FAIL:
    case authActions.ActionTypes.SAVE_LEAD_FAIL:
    case authActions.ActionTypes.SIGN_IN_FAIL: {
      return setErrorMsg(state, action);
    }
    case authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS:
    case authActions.ActionTypes.SIGN_IN_SUCCESS: {
      return signInHandler(state, action);
    }
    case authActions.ActionTypes.READ_TOKEN_SUCCESS: {
      return readTokenHandler(state, action);
    }
    case authActions.ActionTypes.READ_TOKEN_FAIL: {
      return readTokenFailHandler(state);
    }
    case authActions.ActionTypes.SAVE_REDIRECT_URL: {
      return saveRedirectUrlHandler(state, action);
    }
    case authActions.ActionTypes.LOGOUT: {
      return _.cloneDeep(initialAuthState);
    }
    default: {
      return state;
    }
  }
}

/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
function setLoadingHanlder (state: AuthState, loadingState: boolean): AuthState {
  let newState = _.cloneDeep(state);
  newState.loading = loadingState;
  newState.errorMsg = null;
  return newState;
}

function setErrorMsg (state: AuthState, action: authActions.SignInFailAction |
                                                authActions.CompleteRegistrationFailAction |
                                                authActions.RequestPasswordRecoveryFailAction |
                                                authActions.ResetPasswordFailAction |
                                                authActions.SaveLeadFailAction): AuthState {
  let newState = _.cloneDeep(state);
  newState.loading = false;
  newState.errorMsg = action.payload;
  return newState;
}

function signInHandler(state: AuthState, action: authActions.SignInSuccessAction | authActions.CompleteRegistrationSuccessAction) {
  let tokenObject: TokenObject = action.payload;
  let newState = _.cloneDeep(state);

  newState.token = tokenObject.token;
  newState.authenticated = true;
  newState.errorMsg = null;
  newState.loading = false;

  return newState;
}

function readTokenHandler(state: AuthState, action: authActions.ReadTokenSuccessAction) {
  let newState = _.cloneDeep(state);

  newState.token = action.payload;
  newState.authenticated = true;
  newState.errorMsg = null;
  newState.loading = false;

  return newState;
}

function readTokenFailHandler(state: AuthState) {
  let newState = _.cloneDeep(state);

  newState.token = null;
  newState.authenticated = false;
  newState.errorMsg = null;
  newState.loading = false;

  return newState;
}

function saveRedirectUrlHandler(state: AuthState, action: authActions.SaveRedirectUrl) {
  let newState = _.cloneDeep(state);

  newState.redirectUrl = action.payload;
  newState.errorMsg = null;
  newState.loading = false;

  return newState;
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getToken = (state: AuthState) => state.token;
export const getAuthenticated = (state: AuthState) => state.authenticated;
export const getRedirectURL = (state: AuthState) => state.redirectUrl;
export const getErrorMsg = (state: AuthState) => state.errorMsg;
export const getLoading = (state: AuthState) => state.loading;
