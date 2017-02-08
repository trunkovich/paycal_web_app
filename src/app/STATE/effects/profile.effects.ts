/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as authActions from '../actions/auth.actions';
import * as profileActions from '../actions/profile.actions';
import {AuthService} from '../../core/services/auth.service';
import {Employee, EditEmployeeRequestData} from '../models/employee.model';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  @Effect()
  getProfileAfterSignIn$: Observable<Action> = this.actions$
    .ofType(
      authActions.ActionTypes.SIGN_IN_SUCCESS,
      authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS,
      authActions.ActionTypes.READ_TOKEN_SUCCESS,
      profileActions.ActionTypes.SAVE_PROFILE_IMAGE_SUCCESS
    )
    .map(() => new profileActions.GetUserProfileAction())
    .delay(1);

  @Effect()
  getProfile$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.GET_USER_PROFILE)
    .switchMap(() => {
      return this.authService.getProfile()
        .map((profile: Employee) => new profileActions.GetUserProfileSuccessAction(profile))
        .catch(error => Observable.of(new profileActions.GetUserProfileFailAction(error)));
    });

  @Effect()
  updateProfile$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.UPDATE_PROFILE)
    .map(toPayload)
    .switchMap((data: EditEmployeeRequestData) => {
      return this.authService.updateProfile(data)
        .map(() => new profileActions.UpdateProfileSuccessAction(data))
        .catch(error => Observable.of(new profileActions.UpdateProfileFailAction(error.message)));
    });

  @Effect()
  uploadImage$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.UPLOAD_IMAGE)
    .map(toPayload)
    .switchMap((image: File) => {
      return this.authService.uploadImage(image)
        .map((url: string) => new profileActions.UploadImageSuccessAction(url))
        .catch(error => Observable.of(new profileActions.UploadImageFailAction(error.message)));
    });

  @Effect()
  saveProfileImage$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.SAVE_PROFILE_IMAGE)
    .map(toPayload)
    .switchMap((url: string) => {
      return this.authService.updateProfileImage(url)
        .map(() => new profileActions.SaveProfileImageSuccessAction())
        .catch(error => Observable.of(new profileActions.SaveProfileImageFailAction(error.message)));
    });

  @Effect()
  afterImageUpload$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.UPLOAD_IMAGE_SUCCESS)
    .map(toPayload)
    .map((url: string) => new profileActions.SaveProfileImageAction(url));

  @Effect({ dispatch: false })
  redirectToProfile$: Observable<Action> = this.actions$
    .ofType(
      profileActions.ActionTypes.UPDATE_PROFILE_SUCCESS,
      profileActions.ActionTypes.SAVE_PROFILE_IMAGE_SUCCESS
    )
    .do(() => this.authService.redirectToProfile());

  @Effect()
  clearUploadedImageData$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.SAVE_PROFILE_IMAGE_SUCCESS)
    .map(() => new profileActions.ClearImageDataAction());

  @Effect({ dispatch: false })
  redirectAfterAvatarUpload$: Observable<Action> = this.actions$
    .ofType(
      profileActions.ActionTypes.STORE_IMAGE_DATA,
      profileActions.ActionTypes.UPLOAD_IMAGE_FAIL,
      profileActions.ActionTypes.SAVE_PROFILE_IMAGE_FAIL
    )
    .do(() => this.authService.redirectToCropAvatar());

  @Effect({ dispatch: false })
  redirectToCropLoading$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.UPLOAD_IMAGE)
    .do(() => this.authService.redirectToCropLoading());

  @Effect()
  cleanProfileAfterLogout$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGOUT)
    .map(() => new profileActions.CleanProfileAction());

}
