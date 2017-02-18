/**
 * Created by TrUnK on 12.02.2017.
 */
import {Injectable} from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as scheduleActions from '../actions/schedule.actions';
import * as homeActions from '../actions/home.actions';
import {ScheduleService} from '../../core/services/schedule.service';
import {AvailableMonthsStructure, LoadedMonth, EmployeeScheduleEntry} from '../models/employee-schedule-entry.model';
import {AppState, homeSelectors} from '../reducers/index';
import * as authActions from '../actions/auth.actions';
import {Employee, QualifiedEmployee} from '../models/employee.model';
import {GroupSchedule} from '../models/group-schedule.model';

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
    .map(() => new homeActions.CleanScheduleAction())
    .delay(1);

  @Effect()
  fillMyMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS)
    .map(toPayload)
    .map((months: GroupSchedule[]) => new homeActions.FillMyMonthsScheduleAction(months))
    .delay(1);

  @Effect()
  startFullMonthScheduleLoading$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.FILL_MY_MONTH_SCHEDULE)
    .map(() => new homeActions.LoadMyFullScheduleAction());

  @Effect()
  getCurrentMonthScheduleAfterSignIn$: Observable<Action> = this.actions$
    .ofType(
      authActions.ActionTypes.SIGN_IN_SUCCESS,
      authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS,
      authActions.ActionTypes.READ_TOKEN_SUCCESS
    )
    .map(() => new homeActions.LoadMyCurrentMonthScheduleAction())
    .delay(1);

  @Effect()
  loadCurrentMonthScheduleAfterSignIn$: Observable<Action> = this.actions$
    .ofType(
      homeActions.ActionTypes.LOAD_MY_CURRENT_MONTH_SCHEDULE
    )
    .map(() => new homeActions.LoadMyMonthScheduleAction(new Date()))
    .delay(1);

  @Effect()
  createCoverageRequest$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.CREATE_COVERAGE_REQUEST)
    .map(toPayload)
    .switchMap((request) => {
      return this.scheduleService.createCoverageRequest(request)
        .map(() => new homeActions.CreateCoverageRequestSuccessAction())
        .catch(error => Observable.of(new homeActions.CreateCoverageRequestFailAction(error)));
    });

  @Effect({dispatch: false})
  redirectBeforeCreatingCoverageRequest$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.CREATE_COVERAGE_REQUEST)
    .do(() => this.scheduleService.redidrectBeforeCreatingRequest());

  @Effect({dispatch: false})
  redirectAfterCreatingCoverageRequest$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.CREATE_COVERAGE_REQUEST_SUCCESS)
    .do(() => this.scheduleService.redidrectAfterCreatingRequest());

  @Effect()
  initFullScheduleMonthLoading$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS)
    .map(() => new homeActions.LoadMyFullScheduleAction());

  @Effect()
  getCurrentMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE)
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
          return new homeActions.LoadMyMonthScheduleSuccessAction(loadedMonth);
        })
        .catch(error => Observable.of(new homeActions.LoadMyMonthScheduleFailAction(error)))
        .finally(() => this.store.dispatch(new homeActions.LoadMyMonthScheduleFinishedAction()));
    });

  @Effect()
  getAllAvailableMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.LOAD_MY_FULL_SCHEDULE)
    .withLatestFrom(this.store.select(homeSelectors.getHomeFullSchedule))
    .switchMap(([, months]: [any, AvailableMonthsStructure]) => {
      return this.scheduleService.loadMonths(months)
        .map((loadedMonth: LoadedMonth) => new homeActions.LoadMyMonthScheduleSuccessAction(loadedMonth))
        .catch(error => Observable.of(new homeActions.LoadMyMonthScheduleFailAction(error)))
        .finally(() => this.store.dispatch(new homeActions.LoadMyMonthScheduleFinishedAction()));
    });

  @Effect()
  findEmployeesToCoverMyShift$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.LOAD_SHIFT_EMPLOYEES)
    .map(toPayload)
    .switchMap((employeeScheduleEntryID: number) => {
      return this.scheduleService.findEmployeesToCoverMyShift(employeeScheduleEntryID)
        .map((employees: Employee[]) => {
          return employees.map((employee) => {
            return {selected: false, employee};
          });
        })
        .map((qualifiedEmployees: QualifiedEmployee[]) => new homeActions.LoadShiftEmployeesSuccessAction(qualifiedEmployees))
        .catch(error => Observable.of(new homeActions.LoadShiftEmployeesFailAction(error)));
    });
}
