/**
 * Created by TrUnK on 26.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as authActions from '../actions/auth.actions';
import * as profileActions from '../actions/profile.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class StartupEffects {
  constructor(private actions$: Actions) { }

  @Effect({dispatch: false})
  removeSplash$ = this.actions$
    .ofType(
      profileActions.ActionTypes.GET_USER_PROFILE_SUCCESS,
      profileActions.ActionTypes.GET_USER_PROFILE_FAIL,
      authActions.ActionTypes.READ_TOKEN_FAIL,
    )
    .pipe(
      tap(() => document.getElementById('splash').classList.remove('show'))
    );

}
