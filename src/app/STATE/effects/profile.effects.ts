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
      authActions.ActionTypes.READ_TOKEN_SUCCESS
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

  @Effect({ dispatch: false })
  redirectAfterSuccessUpdateProfile$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.UPDATE_PROFILE_SUCCESS)
    .do(() => this.authService.redirectToProfile());

  @Effect()
  cleanProfileAfterLogout$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGOUT)
    .map(() => new profileActions.CleanProfileAction());

}
