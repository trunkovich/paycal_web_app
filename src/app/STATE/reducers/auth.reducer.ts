/**
 * Created by TrUnK on 06.01.2017.
 */
import * as authActions from '../actions/auth.actions';

export interface AuthState {
  token: string | null,
  authenticated: boolean,
  redirectUrl: string| null
}

const initialAuthState = {
  token: null,
  authenticated: false,
  redirectUrl: null
};

export function authReducer(state: AuthState = initialAuthState, action: authActions.Actions): AuthState {
  switch (action.type) {
    case authActions.ActionTypes.SIGN_IN_SUCCESS: {
      return {
        token: action.payload,
        authenticated: true,
        redirectUrl: state.redirectUrl
      };
    }
    case authActions.ActionTypes.SIGN_IN_FAIL: {
      return {
        token: null,
        authenticated: false,
        redirectUrl: state.redirectUrl
      };
    }
    case authActions.ActionTypes.READ_TOKEN_SUCCESS: {
      return {
        token: action.payload,
        authenticated: true,
        redirectUrl: state.redirectUrl
      };
    }
    case authActions.ActionTypes.READ_TOKEN_FAIL: {
      return {
        token: null,
        authenticated: false,
        redirectUrl: state.redirectUrl
      };
    }
    case authActions.ActionTypes.SAVE_REDIRECT_URL: {
      return {
        token: state.token,
        authenticated: state.authenticated,
        redirectUrl: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
