/**
 * Created by TrUnK on 06.01.2017.
 */
import * as authActions from '../actions/auth.actions';

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
    case authActions.ActionTypes.SIGN_IN: {
      return {
        token: state.token,
        authenticated: state.authenticated,
        redirectUrl: state.redirectUrl,
        errorMsg: null,
        loading: true
      };
    }
    case authActions.ActionTypes.SIGN_IN_SUCCESS: {
      return {
        token: action.payload,
        authenticated: true,
        redirectUrl: state.redirectUrl,
        errorMsg: null,
        loading: false
      };
    }
    case authActions.ActionTypes.SIGN_IN_FAIL: {
      return {
        token: null,
        authenticated: false,
        redirectUrl: state.redirectUrl,
        errorMsg: action.payload,
        loading: false
      };
    }
    case authActions.ActionTypes.READ_TOKEN_SUCCESS: {
      return {
        token: action.payload,
        authenticated: true,
        redirectUrl: state.redirectUrl,
        errorMsg: null,
        loading: false
      };
    }
    case authActions.ActionTypes.READ_TOKEN_FAIL: {
      return {
        token: null,
        authenticated: false,
        redirectUrl: state.redirectUrl,
        errorMsg: null,
        loading: false
      };
    }
    case authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY_SUCCESS: {
      return {
        token: state.token,
        authenticated: state.authenticated,
        redirectUrl: state.redirectUrl,
        errorMsg: null,
        loading: false
      };
    }
    case authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY_FAIL: {
      return {
        token: state.token,
        authenticated: state.authenticated,
        redirectUrl: state.redirectUrl,
        errorMsg: action.payload,
        loading: false
      };
    }
    case authActions.ActionTypes.SAVE_REDIRECT_URL: {
      return {
        token: state.token,
        authenticated: state.authenticated,
        redirectUrl: action.payload,
        errorMsg: null,
        loading: false
      };
    }
    case authActions.ActionTypes.LOGOUT: {
      return Object.assign({}, initialAuthState);
    }
    case authActions.ActionTypes.SIGN_IN_CLEAR_ERROR: {
      return {
        token: state.token,
        authenticated: state.authenticated,
        redirectUrl: state.redirectUrl,
        errorMsg: null,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
}
