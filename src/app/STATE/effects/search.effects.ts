/**
 * Created by TrUnK on 12.02.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as searchActions from '../actions/search.actions';
import {ScheduleService} from '../../core/services/schedule.service';
import {AppState, searchSelectors} from '../reducers/index';
import {Employee} from '../models/employee.model';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService,
    private store: Store<AppState>
  ) {}

  @Effect()
  loadSearchReference$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_SEARCH_REFERENCE)
    .withLatestFrom(this.store.select(searchSelectors.getSearchType))
    .map(([action, type]) => {
      switch (type) {
        case 'physicians': {
          return new searchActions.LoadEmployeesInGroupAction();
        }
        case 'call-reference': {
          return new searchActions.LoadCallReferenceAction();
        }
        case 'or-reference': {
          return new searchActions.LoadOrReferenceAction();
        }
      }
    });

  @Effect()
  loadCallReference$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_CALL_REFERENCE)
    .switchMap(() => {
      return this.scheduleService.loadCallReference(new Date())
        .map((codes: string[]) => new searchActions.LoadCallReferenceSuccessAction(codes))
        .catch(error => Observable.of(new searchActions.LoadCallReferenceFailAction(error)));
    });

  @Effect()
  loadOrReference$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_OR_REFERENCE)
    .switchMap(() => {
      return this.scheduleService.loadOrReference(new Date())
        .map((codes: string[]) => new searchActions.LoadOrReferenceSuccessAction(codes))
        .catch(error => Observable.of(new searchActions.LoadOrReferenceFailAction(error)));
    });

  @Effect()
  loadEmployeesInMyGroup$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP)
    .switchMap(() => {
      return this.scheduleService.loadEmployeesInMyGroup()
        .map((employees: Employee[]) => new searchActions.LoadEmployeesInGroupSuccessAction(employees))
        .catch(error => Observable.of(new searchActions.LoadEmployeesInGroupFailAction(error)));
    });
}
