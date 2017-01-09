/**
 * Created by TrUnK on 06.01.2017.
 */
import { Action } from '@ngrx/store';
import { type } from '../utils';
import {Employee} from "../models/employee.model";

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  //GET USER PROFILE
  GET_USER_PROFILE: type('[Auth] Get user profile'),
  GET_USER_PROFILE_SUCCESS:   type('[Auth] Get user profile success'),
  GET_USER_PROFILE_FAIL: type('[Auth] Get user profile failed'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

//GET USER PROFILE
export class GetUserProfileAction implements Action {
  type = ActionTypes.GET_USER_PROFILE;
  constructor() { }
}
export class GetUserProfileSuccessAction implements Action {
  type = ActionTypes.GET_USER_PROFILE_SUCCESS;
  constructor(public payload: Employee) { }
}
export class GetUserProfileFailAction implements Action {
  type = ActionTypes.GET_USER_PROFILE_FAIL;
  constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  //GET USER PROFILE
  = GetUserProfileAction
  | GetUserProfileSuccessAction
  | GetUserProfileFailAction
