/**
 * Created by TrUnK on 12.02.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as searchActions from '../actions/search.actions';
import * as scheduleActions from '../actions/schedule.actions';
import {ScheduleService} from '../../core/services/schedule.service';
import {AppState, searchSelectors, scheduleSelectors} from '../reducers/index';
import {Employee} from '../models/employee.model';
import {GroupSchedule} from '../models/group-schedule.model';
import {AvailableMonthsStructure, LoadedMonth} from '../models/employee-schedule-entry.model';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService,
    private store: Store<AppState>
  ) {}

  @Effect()
  fillMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS)
    .map(toPayload)
    .map((months: GroupSchedule[]) => new searchActions.FillSearchMonthsScheduleAction(months))
    .delay(1);

  @Effect()
  getAllAvailableMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_SEARCH_FULL_SCHEDULE)
    .delay(1)
    .map(toPayload)
    .withLatestFrom(this.store.select(searchSelectors.getFullSchedule))
    .switchMap(([payload, months]: [{type: string; id: string}, AvailableMonthsStructure]) => {
      return this.scheduleService.loadSearchMonths(months, payload.type, payload.id)
        .map((loadedMonth: LoadedMonth) => new searchActions.LoadSearchMonthScheduleSuccessAction(loadedMonth))
        .catch(error => Observable.of(new searchActions.LoadSearchMonthScheduleFailAction(error)))
        .finally(() => this.store.dispatch(new searchActions.LoadSearchMonthScheduleFinishedAction()));
    });

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
    .withLatestFrom(this.store.select(searchSelectors.getEmployeesInGroupList))
    .switchMap(([action, employeesFromStore]: [any, Employee[]]) => {
      if (employeesFromStore && employeesFromStore.length) {
        return Observable.of(new searchActions.LoadEmployeesInGroupFailAction('loaded'));
      } else {
        return this.scheduleService.loadEmployeesInMyGroup()
          .map((employees: Employee[]) => new searchActions.LoadEmployeesInGroupSuccessAction(employees))
          .catch(error => Observable.of(new searchActions.LoadEmployeesInGroupFailAction(error)));
      }
    });
}
