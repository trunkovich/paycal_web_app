/**
 * Created by TrUnK on 06.01.2017.
 */
import { Action } from '@ngrx/store';
import { type } from '../utils';
import {Employee, EditEmployeeRequestData} from '../models/employee.model';
import {ImageDataModel} from '../models/image-data.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  // GET USER PROFILE
  GET_USER_PROFILE: type('[Profile] Get user profile'),
  GET_USER_PROFILE_SUCCESS:   type('[Profile] Get user profile success'),
  GET_USER_PROFILE_FAIL: type('[Profile] Get user profile failed'),

  // GET USER PROFILE
  UPDATE_PROFILE: type('[Profile] Update profile'),
  UPDATE_PROFILE_SUCCESS:   type('[Profile] Update profile success'),
  UPDATE_PROFILE_FAIL: type('[Profile] Update profile failed'),

  // CLEAN PROFILE
  CLEAN_PROFILE: type('[Profile] Clean profile'),
  CLEAR_PROFILE_ERROR: type('[Profile] Clear profile error'),
  STORE_IMAGE_DATA: type('[Profile] Store image data')
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

// GET USER PROFILE
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

// GET USER PROFILE
export class UpdateProfileAction implements Action {
  type = ActionTypes.UPDATE_PROFILE;
  constructor(public payload: EditEmployeeRequestData) { }
}
export class UpdateProfileSuccessAction implements Action {
  type = ActionTypes.UPDATE_PROFILE_SUCCESS;
  constructor(public payload: EditEmployeeRequestData) { }
}
export class UpdateProfileFailAction implements Action {
  type = ActionTypes.UPDATE_PROFILE_FAIL;
  constructor(public payload: any) { }
}

// CLEAN PROFILE
export class CleanProfileAction implements Action {
  type = ActionTypes.CLEAN_PROFILE;
}
export class ProfileClearErrorAction implements Action {
  type = ActionTypes.CLEAR_PROFILE_ERROR;
}
export class StoreImageData implements Action {
  type = ActionTypes.STORE_IMAGE_DATA;
  constructor(public payload: ImageDataModel) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  // GET USER PROFILE
  = GetUserProfileAction
  | GetUserProfileSuccessAction
  | GetUserProfileFailAction

  // GET USER PROFILE
  | UpdateProfileAction
  | UpdateProfileSuccessAction
  | UpdateProfileFailAction

  // CLEAN PROFILE
  | CleanProfileAction
  | StoreImageData
  | ProfileClearErrorAction;
