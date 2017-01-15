/**
 * Created by TrUnK on 06.01.2017.
 */
import { Action } from '@ngrx/store';
import { type } from '../utils';
import {Credentials} from '../models/credentials.model';
import {ResetPasswordModel} from '../models/reset-password.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {

  // SIGN IN ACTIONS
  SIGN_IN: type('[Auth] SignIn'),
  SIGN_IN_SUCCESS:   type('[Auth] SignIn success'),
  SIGN_IN_FAIL: type('[Auth] SignIn failed'),

  // READ USER FROM LS
  READ_TOKEN: type('[Auth] Read token'),
  READ_TOKEN_SUCCESS:   type('[Auth] Read token success'),
  READ_TOKEN_FAIL: type('[Auth] Read token failed'),

  // REQUEST PASSWORD RECOVERY ACTIONS
  REQUEST_PASSWORD_RECOVERY: type('[Auth] Request password recover'),
  REQUEST_PASSWORD_RECOVERY_SUCCESS:   type('[Auth] Request password recover success'),
  REQUEST_PASSWORD_RECOVERY_FAIL: type('[Auth] Request password recover failed'),

  // RESET PASSWORD ACTIONS
  RESET_PASSWORD: type('[Auth] Reset password'),
  RESET_PASSWORD_SUCCESS:   type('[Auth] Reset password success'),
  RESET_PASSWORD_FAIL: type('[Auth] Reset password failed'),

  // OTHERS
  SAVE_REDIRECT_URL: type('[Auth] Save redirect url'),
  SIGN_IN_CLEAR_ERROR: type('[Auth] Sign in clear error'),
  LOGOUT: type('[Auth] Logout')
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

// SIGN IN ACTIONS
export class SignInAction implements Action {
  type = ActionTypes.SIGN_IN;
  constructor(public payload: Credentials) { }
}
export class SignInSuccessAction implements Action {
  type = ActionTypes.SIGN_IN_SUCCESS;
  constructor(public payload: string) { }
}
export class SignInFailAction implements Action {
  type = ActionTypes.SIGN_IN_FAIL;
  constructor(public payload: string) { }
}

// REQUEST PASSWORD RECOVERY ACTIONS
export class RequestPasswordRecoveryAction implements Action {
  type = ActionTypes.REQUEST_PASSWORD_RECOVERY;
  constructor(public payload: string) { }
}
export class RequestPasswordRecoverySuccessAction implements Action {
  type = ActionTypes.REQUEST_PASSWORD_RECOVERY_SUCCESS;
  constructor() { }
}
export class RequestPasswordRecoveryFailAction implements Action {
  type = ActionTypes.REQUEST_PASSWORD_RECOVERY_FAIL;
  constructor(public payload: string) { }
}

// RESET PASSWORD ACTIONS
export class ResetPasswordAction implements Action {
  type = ActionTypes.RESET_PASSWORD;
  constructor(public payload: ResetPasswordModel) { }
}
export class ResetPasswordSuccessAction implements Action {
  type = ActionTypes.RESET_PASSWORD_SUCCESS;
  constructor() { }
}
export class ResetPasswordFailAction implements Action {
  type = ActionTypes.RESET_PASSWORD_FAIL;
  constructor(public payload: string) { }
}

// READ USER FROM LS
export class ReadTokenAction implements Action {
  type = ActionTypes.READ_TOKEN;
  constructor() { }
}
export class ReadTokenSuccessAction implements Action {
  type = ActionTypes.READ_TOKEN_SUCCESS;
  constructor(public payload: string) { }
}
export class ReadTokenFailAction implements Action {
  type = ActionTypes.READ_TOKEN_FAIL;
  constructor(public payload: any) { }
}

// OTHERS
export class SaveRedirectUrl implements Action {
  type = ActionTypes.SAVE_REDIRECT_URL;
  constructor(public payload: string) {}
}
export class SignInClearErrorAction implements Action {
  type = ActionTypes.SIGN_IN_CLEAR_ERROR;
}
export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  // SIGN IN
  = SignInAction
  | SignInSuccessAction
  | SignInFailAction

  // READ USER FROM LS
  | ReadTokenAction
  | ReadTokenSuccessAction
  | ReadTokenFailAction

  // REQUEST PASSWORD RECOVERY ACTIONS
  | RequestPasswordRecoveryAction
  | RequestPasswordRecoverySuccessAction
  | RequestPasswordRecoveryFailAction

  // RESET PASSWORD ACTIONS
  | ResetPasswordAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailAction

  //  OTHERS
  | SaveRedirectUrl
  | SignInClearErrorAction
  | LogoutAction;
