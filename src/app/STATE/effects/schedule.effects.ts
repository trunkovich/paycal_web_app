/**
 * Created by TrUnK on 20.01.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as scheduleActions from '../actions/schedule.actions';
import {ScheduleService} from '../../core/services/schedule.service';
import {GroupSchedule} from '../models/group-schedule.model';
import {AvailableMonthsStructure, LoadedMonth, EmployeeScheduleEntry} from '../models/employee-schedule-entry.model';
import {AppState, scheduleSelectors} from '../reducers/index';
import * as authActions from '../actions/auth.actions';
import {Employee, QualifiedEmployee} from '../models/employee.model';

@Injectable()
export class ScheduleEffects {
  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService,
    private store: Store<AppState>
  ) {}

  @Effect()
  getGroupMonthsAfterSignIn$: Observable<Action> = this.actions$
    .ofType(
      authActions.ActionTypes.SIGN_IN_SUCCESS,
      authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS,
      authActions.ActionTypes.READ_TOKEN_SUCCESS
    )
    .map(() => new scheduleActions.LoadGroupScheduleMonthsAction())
    .delay(1);

  @Effect()
  getCurrentMonthScheduleAfterSignIn$: Observable<Action> = this.actions$
    .ofType(
      authActions.ActionTypes.SIGN_IN_SUCCESS,
      authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS,
      authActions.ActionTypes.READ_TOKEN_SUCCESS
    )
    .map(() => new scheduleActions.LoadMyMonthScheduleAction(new Date()))
    .delay(1);

  @Effect()
  getGroupScheduleMonths$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS)
    .switchMap(() => {
      return this.scheduleService.getGroupScheduleMonths()
        .map((months: GroupSchedule[]) => new scheduleActions.LoadGroupScheduleMonthsSuccessAction(months))
        .catch(error => Observable.of(new scheduleActions.LoadGroupScheduleMonthsFailAction(error)));
    });

  @Effect()
  loadSearchReference$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_SEARCH_REFERENCE)
    .withLatestFrom(this.store.select(scheduleSelectors.getSearchType))
    .map(([action, type]) => {
      switch (type) {
        case 'physicians': {
          return new scheduleActions.LoadEmployeesInGroupAction();
        }
        case 'call-reference': {
          return new scheduleActions.LoadCallReferenceAction();
        }
        case 'or-reference': {
          return new scheduleActions.LoadOrReferenceAction();
        }
      }
    });

  @Effect()
  loadCallReference$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_CALL_REFERENCE)
    .switchMap(() => {
      return this.scheduleService.loadCallReference(new Date())
        .map((codes: string[]) => new scheduleActions.LoadCallReferenceSuccessAction(codes))
        .catch(error => Observable.of(new scheduleActions.LoadCallReferenceFailAction(error)));
    });

  @Effect()
  loadOrReference$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_OR_REFERENCE)
    .switchMap(() => {
      return this.scheduleService.loadOrReference(new Date())
        .map((codes: string[]) => new scheduleActions.LoadOrReferenceSuccessAction(codes))
        .catch(error => Observable.of(new scheduleActions.LoadOrReferenceFailAction(error)));
    });

  @Effect()
  loadEmployeesInMyGroup$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP)
    .switchMap(() => {
      return this.scheduleService.loadEmployeesInMyGroup()
        .map((employees: Employee[]) => new scheduleActions.LoadEmployeesInGroupSuccessAction(employees))
        .catch(error => Observable.of(new scheduleActions.LoadEmployeesInGroupFailAction(error)));
    });

  @Effect()
  createCoverageRequest$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.CREATE_COVERAGE_REQUEST)
    .map(toPayload)
    .switchMap((request) => {
      return this.scheduleService.createCoverageRequest(request)
        .map(() => new scheduleActions.CreateCoverageRequestSuccessAction())
        .catch(error => Observable.of(new scheduleActions.CreateCoverageRequestFailAction(error)));
    });

  @Effect({dispatch: false})
  redirectBeforeCreatingCoverageRequest$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.CREATE_COVERAGE_REQUEST)
    .do(() => this.scheduleService.redidrectBeforeCreatingRequest());

  @Effect({dispatch: false})
  redirectAfterCreatingCoverageRequest$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.CREATE_COVERAGE_REQUEST_SUCCESS)
    .do(() => this.scheduleService.redidrectAfterCreatingRequest());

  @Effect()
  initFullScheduleMonthLoading$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS)
    .map(() => new scheduleActions.LoadMyFullScheduleAction());

  @Effect()
  getCurrentMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE)
    .map(toPayload)
    .switchMap((date: Date) => {
      return this.scheduleService.getMyMonthSchedule({month: date.getMonth() + 1, year: date.getFullYear()})
        .map((entries: EmployeeScheduleEntry[]) => {
          let loadedMonth: LoadedMonth = {
            dateString: `${date.getFullYear()}.${date.getMonth() + 1}`,
            entries: entries,
            loaded: true,
            month: date.getMonth() + 1,
            year: date.getFullYear()
          };
          return new scheduleActions.LoadMyMonthScheduleSuccessAction(loadedMonth);
        })
        .catch(error => Observable.of(new scheduleActions.LoadMyMonthScheduleFailAction(error)))
        .finally(() => this.store.dispatch(new scheduleActions.LoadMyMonthScheduleFinishedAction()));
    });

  @Effect()
  getAllAvailableMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_MY_FULL_SCHEDULE)
    .withLatestFrom(this.store.select(scheduleSelectors.getFullSchedule))
    .switchMap(([, months]: [any, AvailableMonthsStructure]) => {
      return this.scheduleService.loadMonths(months)
        .map((loadedMonth: LoadedMonth) => new scheduleActions.LoadMyMonthScheduleSuccessAction(loadedMonth))
        .catch(error => Observable.of(new scheduleActions.LoadMyMonthScheduleFailAction(error)))
        .finally(() => this.store.dispatch(new scheduleActions.LoadMyMonthScheduleFinishedAction()));
    });

  @Effect()
  findEmployeesToCoverMyShift$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_SHIFT_EMPLOYEES)
    .map(toPayload)
    .switchMap((employeeScheduleEntryID: number) => {
      return this.scheduleService.findEmployeesToCoverMyShift(employeeScheduleEntryID)
        .map((employees: Employee[]) => {
          return employees.map((employee) => {
            return {selected: false, employee};
          });
        })
        .map((qualifiedEmployees: QualifiedEmployee[]) => new scheduleActions.LoadShiftEmployeesSuccessAction(qualifiedEmployees))
        .catch(error => Observable.of(new scheduleActions.LoadShiftEmployeesFailAction(error)));
    });

  @Effect()
  cleanScheduleAfterLogout$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGOUT)
    .map(() => new scheduleActions.CleanScheduleAction());
}
