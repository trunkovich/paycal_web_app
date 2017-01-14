/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as authActions from '../actions/auth.actions';
import * as profileActions from '../actions/profile.actions';
import {AuthService} from '../../core/services/auth.service';
import {Employee} from '../models/employee.model';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  @Effect()
  getProfileAfterSignIn$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN_SUCCESS)
    .map(() => new profileActions.GetUserProfileAction());

  @Effect()
  getProfileAfterReadToken: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.READ_TOKEN_SUCCESS)
    .map(() => new profileActions.GetUserProfileAction());

  @Effect()
  getProfile$: Observable<Action> = this.actions$
    .ofType(profileActions.ActionTypes.GET_USER_PROFILE)
    .switchMap(() => {
      return this.authService.getProfile()
        .map((profile: Employee) => new profileActions.GetUserProfileSuccessAction(profile))
        .catch(error => Observable.of(new profileActions.GetUserProfileFailAction(error)));
    });

}
