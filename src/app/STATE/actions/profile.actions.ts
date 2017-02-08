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

  // UPLOAD IMAGE
  UPLOAD_IMAGE: type('[Profile] Upload image'),
  UPLOAD_IMAGE_SUCCESS: type('[Profile] Upload image success'),
  UPLOAD_IMAGE_FAIL: type('[Profile] Upload image fail'),

  // UPLOAD IMAGE
  SAVE_PROFILE_IMAGE: type('[Profile] Save profile image'),
  SAVE_PROFILE_IMAGE_SUCCESS: type('[Profile] Save profile image success'),
  SAVE_PROFILE_IMAGE_FAIL: type('[Profile] Save profile image fail'),

  // CLEAN PROFILE
  CLEAN_PROFILE: type('[Profile] Clean profile'),
  CLEAR_PROFILE_ERROR: type('[Profile] Clear profile error'),
  STORE_IMAGE_DATA: type('[Profile] Store image data'),
  CLEAR_IMAGE_DATA: type('[Profile] Clear image data')
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

// UPLOAD IMAGE
export class UploadImageAction implements Action {
  type = ActionTypes.UPLOAD_IMAGE;
  constructor(public payload: File) { }
}
export class UploadImageSuccessAction implements Action {
  type = ActionTypes.UPLOAD_IMAGE_SUCCESS;
  constructor(public payload: string) { }
}
export class UploadImageFailAction implements Action {
  type = ActionTypes.UPLOAD_IMAGE_FAIL;
  constructor(public payload: any) { }
}

// UPLOAD IMAGE
export class SaveProfileImageAction implements Action {
  type = ActionTypes.SAVE_PROFILE_IMAGE;
  constructor(public payload: string) { }
}
export class SaveProfileImageSuccessAction implements Action {
  type = ActionTypes.SAVE_PROFILE_IMAGE_SUCCESS;
}
export class SaveProfileImageFailAction implements Action {
  type = ActionTypes.SAVE_PROFILE_IMAGE_FAIL;
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
export class ClearImageDataAction implements Action {
  type = ActionTypes.CLEAR_IMAGE_DATA;
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

  // UPLOAD IMAGE
  | UploadImageAction
  | UploadImageSuccessAction
  | UploadImageFailAction

  // UPLOAD IMAGE
  | SaveProfileImageAction
  | SaveProfileImageSuccessAction
  | SaveProfileImageFailAction

  // CLEAN PROFILE
  | CleanProfileAction
  | StoreImageData
  | ClearImageDataAction
  | ProfileClearErrorAction;
