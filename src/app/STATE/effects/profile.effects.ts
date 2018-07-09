/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import * as Raven from 'raven-js';

import * as authActions from '../actions/auth.actions';
import * as profileActions from '../actions/profile.actions';
import { AuthService } from '../../core/services/auth.service';
import { EditEmployeeRequestData, Employee } from '../models/employee.model';
import { catchError, map, switchMap, tap, delay } from 'rxjs/operators';

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
    .pipe(
      map(() => new profileActions.GetUserProfileAction()),
      delay(1)
    );

  @Effect()
  getProfile$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.GET_USER_PROFILE)
    .pipe(
      switchMap(() =>
        this.authService.getProfile()
          .pipe(
            map((profile: Employee) => new profileActions.GetUserProfileSuccessAction(profile)),
            catchError(error => observableOf(new profileActions.GetUserProfileFailAction(error)))
          )
      )
    );

  @Effect()
  updateProfile$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.UPDATE_PROFILE)
    .pipe(
      map((action: profileActions.UpdateProfileAction) => action.payload),
      switchMap((data: EditEmployeeRequestData) =>
        this.authService.updateProfile(data)
          .pipe(
            map(() => new profileActions.UpdateProfileSuccessAction(data)),
            catchError(error => observableOf(new profileActions.UpdateProfileFailAction(error.message)))
          )
      )
    );

  @Effect()
  uploadImage$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.UPLOAD_IMAGE)
    .pipe(
      map((action: profileActions.UploadImageAction) => action.payload),
      switchMap((image: File) =>
        this.authService.uploadImage(image)
          .pipe(
            map((url: string) => new profileActions.UploadImageSuccessAction(url)),
            catchError(error => observableOf(new profileActions.UploadImageFailAction(error.message)))
          )
      )
    );

  @Effect()
  saveProfileImage$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.SAVE_PROFILE_IMAGE)
    .pipe(
      map((action: profileActions.SaveProfileImageAction) => action.payload),
      switchMap((url: string) =>
        this.authService.updateProfileImage(url)
          .pipe(
            map(() => new profileActions.SaveProfileImageSuccessAction()),
            catchError(error => observableOf(new profileActions.SaveProfileImageFailAction(error.message)))
          )
      )
    );

  @Effect()
  afterImageUpload$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.UPLOAD_IMAGE_SUCCESS)
    .pipe(
      map((action: profileActions.UploadImageSuccessAction) => action.payload),
      map((url: string) => new profileActions.SaveProfileImageAction(url))
    );

  @Effect({ dispatch: false })
  redirectToProfile$: Observable<Action> = this.actions$
    .ofType(
      profileActions.ActionTypes.UPDATE_PROFILE_SUCCESS,
      profileActions.ActionTypes.SAVE_PROFILE_IMAGE_SUCCESS
    )
    .pipe(
      tap(() => this.authService.redirectToProfile())
    );

  @Effect()
  clearUploadedImageData$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.SAVE_PROFILE_IMAGE_SUCCESS)
    .pipe(
      map(() => new profileActions.ClearImageDataAction())
    );

  @Effect({ dispatch: false })
  redirectAfterAvatarUpload$: Observable<Action> = this.actions$
    .ofType(
      profileActions.ActionTypes.STORE_IMAGE_DATA,
      profileActions.ActionTypes.UPLOAD_IMAGE_FAIL,
      profileActions.ActionTypes.SAVE_PROFILE_IMAGE_FAIL
    )
    .pipe(
      tap(() => this.authService.redirectToCropAvatar())
    );

  @Effect({ dispatch: false })
  redirectToCropLoading$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.UPLOAD_IMAGE)
    .pipe(
      tap(() => this.authService.redirectToCropLoading())
    );

  @Effect()
  cleanProfileAfterLogout$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGOUT)
    .pipe(
      map(() => new profileActions.CleanProfileAction())
    );

  @Effect({dispatch: false})
  registerSentryContext$ = this.actions$
    .ofType(profileActions.ActionTypes.GET_USER_PROFILE_SUCCESS)
    .pipe(
      map((action: profileActions.GetUserProfileSuccessAction) => action.payload),
      tap((user: Employee) =>
        Raven.setUserContext({
          username: user.MobilePhone,
          email: user.Email,
          id: user.EmployeeID.toString()
        })),
      delay(1)
    );
}
