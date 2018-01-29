/**
 * Created by TrUnK on 26.01.2017.
 */
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';

import * as authActions from '../actions/auth.actions';
import * as referencesActions from '../actions/references.actions';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

@Injectable()
export class InitEffects {
  constructor() { }

  @Effect()
  init$: Observable<Action> = Observable.defer(() => {
    return Observable.merge([
      new authActions.ReadTokenAction(),
      new referencesActions.LoadStatesAction(),
      new referencesActions.LoadRegionsAction()
    ]);
  });

}
