/**
 * Created by TrUnK on 26.01.2017.
 */
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';

import * as authActions from '../actions/auth.actions';
import * as referencesActions from '../actions/references.actions';
import { Observable, defer as observableDefer, merge as observableMerge } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class InitEffects {
  constructor() { }

  @Effect()
  init$: Observable<Action> = observableDefer(() => {
    return observableMerge([
      new authActions.ReadTokenAction(),
      new referencesActions.LoadStatesAction(),
      new referencesActions.LoadRegionsAction()
    ]);
  });

}
