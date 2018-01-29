/**
 * Created by TrUnK on 12.02.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as searchActions from '../actions/search.actions';
import * as scheduleActions from '../actions/schedule.actions';
import { ScheduleService } from '../../core/services/schedule.service';
import { AppState, searchSelectors } from '../reducers/index';
import { Employee } from '../models/employee.model';
import { GroupSchedule } from '../models/group-schedule.model';
import { AvailableMonthsStructure, LoadedMonth } from '../models/employee-schedule-entry.model';
import { catchError, finalize, map, switchMap, withLatestFrom, delay } from 'rxjs/operators';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService,
    private store: Store<AppState>
  ) {}

  @Effect()
  cleanSchedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.CLEAN_SCHEDULE)
    .pipe(
      map(() => new searchActions.CleanScheduleAction()),
      delay(1)
    );

  @Effect()
  fillMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS)
    .pipe(
      map((action: scheduleActions.LoadGroupScheduleMonthsSuccessAction) => action.payload),
      map((months: GroupSchedule[]) => new searchActions.FillSearchMonthsScheduleAction(months)),
      delay(1)
    );

  @Effect()
  getAllAvailableMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_SEARCH_FULL_SCHEDULE)
    .pipe(
      delay(1),
      map((action: searchActions.LoadSearchFullScheduleAction) => action.payload),
      withLatestFrom(this.store.select(searchSelectors.getFullSchedule)),
      switchMap(([payload, months]: [{type: string; id: string}, AvailableMonthsStructure]) => {
        return this.scheduleService.loadSearchMonths(months, payload.type, payload.id)
          .pipe(
            map((loadedMonth: LoadedMonth) => new searchActions.LoadSearchMonthScheduleSuccessAction(loadedMonth)),
            catchError(error => Observable.of(new searchActions.LoadSearchMonthScheduleFailAction(error))),
            finalize(() => this.store.dispatch(new searchActions.LoadSearchMonthScheduleFinishedAction()))
          );
      })
    );

  @Effect()
  loadSearchReference$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_SEARCH_REFERENCE)
    .pipe(
      withLatestFrom(this.store.select(searchSelectors.getSearchType)),
      map(([action, type]) => {
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
      })
    );

  @Effect()
  loadCallReference$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_CALL_REFERENCE)
    .pipe(
      switchMap(() => this.scheduleService.loadCallReference(new Date())),
      map((codes: string[]) => new searchActions.LoadCallReferenceSuccessAction(codes)),
      catchError(error => Observable.of(new searchActions.LoadCallReferenceFailAction(error)))
    );

  @Effect()
  loadOrReference$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_OR_REFERENCE)
    .pipe(
      switchMap(() => this.scheduleService.loadOrReference(new Date())),
      map((codes: string[]) => new searchActions.LoadOrReferenceSuccessAction(codes)),
      catchError(error => Observable.of(new searchActions.LoadOrReferenceFailAction(error)))
    );

  @Effect()
  loadEmployeesInMyGroup$: Observable<Action> = this.actions$
    .ofType(searchActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP)
    .pipe(
      withLatestFrom(this.store.select(searchSelectors.getEmployeesInGroupList)),
      switchMap(([action, employeesFromStore]: [any, Employee[]]) => {
        if (employeesFromStore && employeesFromStore.length) {
          return Observable.of(new searchActions.LoadEmployeesInGroupFailAction('loaded'));
        } else {
          return this.scheduleService.loadEmployeesInMyGroup()
            .pipe(
              map((employees: Employee[]) => new searchActions.LoadEmployeesInGroupSuccessAction(employees)),
              catchError(error => Observable.of(new searchActions.LoadEmployeesInGroupFailAction(error)))
            );
        }
      })
    );
}
