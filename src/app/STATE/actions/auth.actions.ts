/**
 * Created by TrUnK on 06.01.2017.
 */
import { Action } from '@ngrx/store';
import { type } from '../utils';
import {Credentials} from "../models/credentials.model";

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {

  //SIGN IN ACTIONS
  SIGN_IN: type('[Auth] SignIn'),
  SIGN_IN_SUCCESS:   type('[Auth] SignIn success'),
  SIGN_IN_FAIL: type('[Auth] SignIn failed'),

  //READ USER FROM LS
  READ_TOKEN: type('[Auth] Read token'),
  READ_TOKEN_SUCCESS:   type('[Auth] Read token success'),
  READ_TOKEN_FAIL: type('[Auth] Read token failed'),

  //OTHERS
  SAVE_REDIRECT_URL: type('[Auth] Save redirect url'),
  SIGN_IN_CLEAR_ERROR: type('[Auth] Sign in clear error')
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

//SIGN IN ACTIONS
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

//READ USER FROM LS
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

//OTHERS
export class SaveRedirectUrl implements Action {
  type = ActionTypes.SAVE_REDIRECT_URL;
  constructor(public payload: string) {}
}
export class SignInClearErrorAction implements Action {
  type = ActionTypes.SIGN_IN_CLEAR_ERROR;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  //SIGN IN
  = SignInAction
  | SignInSuccessAction
  | SignInFailAction

  //READ USER FROM LS
  | ReadTokenAction
  | ReadTokenSuccessAction
  | ReadTokenFailAction

  // OTHERS
  | SaveRedirectUrl
  | SignInClearErrorAction
