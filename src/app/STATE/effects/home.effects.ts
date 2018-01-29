/**
 * Created by TrUnK on 12.02.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as scheduleActions from '../actions/schedule.actions';
import * as homeActions from '../actions/home.actions';
import { ScheduleService } from '../../core/services/schedule.service';
import { AvailableMonthsStructure, EmployeeScheduleEntry, LoadedMonth } from '../models/employee-schedule-entry.model';
import { AppState, homeSelectors } from '../reducers/index';
import * as authActions from '../actions/auth.actions';
import { Employee, QualifiedEmployee } from '../models/employee.model';
import { GroupSchedule } from '../models/group-schedule.model';
import { catchError, finalize, map, switchMap, tap, withLatestFrom, delay } from 'rxjs/operators';

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService,
    private store: Store<AppState>
  ) {}

  @Effect()
  cleanSchedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.CLEAN_SCHEDULE)
    .pipe(
      map(() => new homeActions.CleanScheduleAction()),
      delay(1)
    );

  @Effect()
  fillMyMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS)
    .pipe(
      map((action: scheduleActions.LoadGroupScheduleMonthsSuccessAction) => action.payload),
      map((months: GroupSchedule[]) => new homeActions.FillMyMonthsScheduleAction(months)),
      delay(1)
    );

  @Effect()
  startFullMonthScheduleLoading$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.FILL_MY_MONTH_SCHEDULE)
    .pipe(
      map(() => new homeActions.LoadMyFullScheduleAction())
    );

  @Effect()
  getCurrentMonthScheduleAfterSignIn$: Observable<Action> = this.actions$
    .ofType(
      authActions.ActionTypes.SIGN_IN_SUCCESS,
      authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS,
      authActions.ActionTypes.READ_TOKEN_SUCCESS
    )
    .pipe(
      map(() => new homeActions.LoadMyCurrentMonthScheduleAction()),
      delay(1)
    );

  @Effect()
  loadCurrentMonthScheduleAfterSignIn$: Observable<Action> = this.actions$
    .ofType(
      homeActions.ActionTypes.LOAD_MY_CURRENT_MONTH_SCHEDULE
    )
    .pipe(
      map(() => new homeActions.LoadMyMonthScheduleAction(new Date())),
      delay(1)
    );

  @Effect()
  createCoverageRequest$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.CREATE_COVERAGE_REQUEST)
    .pipe(
      map((action: homeActions.CreateCoverageRequestAction) => action.payload),
      switchMap((request) => this.scheduleService.createCoverageRequest(request)),
      map(() => new homeActions.CreateCoverageRequestSuccessAction()),
      catchError(error => Observable.of(new homeActions.CreateCoverageRequestFailAction(error)))
    );

  @Effect({dispatch: false})
  redirectBeforeCreatingCoverageRequest$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.CREATE_COVERAGE_REQUEST)
    .pipe(
      tap(() => this.scheduleService.redidrectBeforeCreatingRequest())
    );

  @Effect({dispatch: false})
  redirectAfterCreatingCoverageRequest$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.CREATE_COVERAGE_REQUEST_SUCCESS)
    .pipe(
      tap(() => this.scheduleService.redidrectAfterCreatingRequest())
    );

  @Effect()
  initFullScheduleMonthLoading$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS)
    .pipe(
      map(() => new homeActions.LoadMyFullScheduleAction())
    );

  @Effect()
  getCurrentMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE)
    .pipe(
      map((action: homeActions.LoadMyMonthScheduleAction) => action.payload),
      switchMap((date: Date) => {
        return this.scheduleService.getMyMonthSchedule({month: date.getMonth() + 1, year: date.getFullYear()})
          .pipe(
            map((entries: EmployeeScheduleEntry[]) => {
              let loadedMonth: LoadedMonth = {
                dateString: `${date.getFullYear()}.${date.getMonth() + 1}`,
                entries: entries,
                loaded: true,
                month: date.getMonth() + 1,
                year: date.getFullYear()
              };
              return new homeActions.LoadMyMonthScheduleSuccessAction(loadedMonth);
            }),
            catchError(error => Observable.of(new homeActions.LoadMyMonthScheduleFailAction(error))),
            finalize(() => this.store.dispatch(new homeActions.LoadMyMonthScheduleFinishedAction()))
          );
      })
    );

  @Effect()
  getAllAvailableMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.LOAD_MY_FULL_SCHEDULE)
    .pipe(
      withLatestFrom(this.store.select(homeSelectors.getHomeFullSchedule)),
      switchMap(([, months]: [any, AvailableMonthsStructure]) => this.scheduleService.loadMonths(months)),
      map((loadedMonth: LoadedMonth) => new homeActions.LoadMyMonthScheduleSuccessAction(loadedMonth)),
      catchError(error => Observable.of(new homeActions.LoadMyMonthScheduleFailAction(error))),
      finalize(() => this.store.dispatch(new homeActions.LoadMyMonthScheduleFinishedAction()))
    );

  @Effect()
  findEmployeesToCoverMyShift$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.LOAD_SHIFT_EMPLOYEES)
    .pipe(
      map((action: homeActions.LoadShiftEmployeesAction) => action.payload),
      switchMap((employeeScheduleEntryID: number) => this.scheduleService.findEmployeesToCoverMyShift(employeeScheduleEntryID)),
      map((employees: Employee[]) => {
        return employees.map((employee) => {
          return {selected: false, employee};
        });
      }),
      map((qualifiedEmployees: QualifiedEmployee[]) => new homeActions.LoadShiftEmployeesSuccessAction(qualifiedEmployees)),
      catchError(error => Observable.of(new homeActions.LoadShiftEmployeesFailAction(error)))
    );
}
