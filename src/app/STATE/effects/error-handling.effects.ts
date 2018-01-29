/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as authActions from '../actions/auth.actions';
import { ReadTokenFailAction } from '../actions/auth.actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ErrorHandlingEffects {
  constructor(private actions$: Actions) { }

  @Effect({ dispatch: false })
  notAuthenticated$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.READ_TOKEN_FAIL)
    .pipe(
      map((action: ReadTokenFailAction) => action.payload),
      tap((err) => console.warn('Not authenticated: ', err))
    );
}
