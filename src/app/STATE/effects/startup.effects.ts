/**
 * Created by TrUnK on 26.01.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as authActions from '../actions/auth.actions';
import * as profileActions from '../actions/profile.actions';

@Injectable()
export class StartupEffects {
  constructor(private actions$: Actions) { }

  @Effect({dispatch: false})
  removeSplash$: Observable<Action> = this.actions$
    .ofType(
      profileActions.ActionTypes.GET_USER_PROFILE_SUCCESS,
      authActions.ActionTypes.READ_TOKEN_FAIL,
    )
    .do(() => document.getElementById('splash').classList.remove('show'))
    .delay(1);

}
