/**
 * Created by TrUnK on 20.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';

import * as scheduleActions from '../actions/schedule.actions';
import { ScheduleService } from '../../core/services/schedule.service';
import { GroupSchedule } from '../models/group-schedule.model';
import { AppState } from '../reducers/index';
import * as authActions from '../actions/auth.actions';
import { catchError, map, switchMap, delay } from 'rxjs/operators';

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
    .pipe(
      map(() => new scheduleActions.LoadGroupScheduleMonthsAction()),
      delay(1)
    );

  @Effect()
  getGroupScheduleMonths$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS)
    .pipe(
      switchMap(() =>
        this.scheduleService.getGroupScheduleMonths()
          .pipe(
            map((months: GroupSchedule[]) => new scheduleActions.LoadGroupScheduleMonthsSuccessAction(months)),
            catchError(error => observableOf(new scheduleActions.LoadGroupScheduleMonthsFailAction(error)))
          )
      )
    );

  @Effect()
  cleanScheduleAfterLogout$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGOUT)
    .pipe(
      map(() => new scheduleActions.CleanScheduleAction())
    );
}
