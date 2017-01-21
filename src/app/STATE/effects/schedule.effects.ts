/**
 * Created by TrUnK on 20.01.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as scheduleActions from '../actions/schedule.actions';
import {ScheduleService} from '../../core/services/schedule.service';
import {GroupSchedule} from '../models/group-schedule.model';
import {EmployeeScheduleEntry} from '../models/employee-schedule-entry.model';

@Injectable()
export class ScheduleEffects {
  constructor(private actions$: Actions, private scheduleService: ScheduleService) { }

  @Effect()
  getGroupScheduleMonths$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS)
    .map(toPayload)
    .switchMap(() => {
      return this.scheduleService.getGroupScheduleMonths()
        .map((months: GroupSchedule[]) => new scheduleActions.LoadGroupScheduleMonthsSuccessAction(months))
        .catch(error => Observable.of(new scheduleActions.LoadGroupScheduleMonthsFailAction(error)));
    });

  @Effect()
  getMyMonthSchedule: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE)
    .map(toPayload)
    .switch()
    .switchMap((date: Date) => {
      return this.scheduleService.getMyMonthSchedule(date)
        .map((entries: EmployeeScheduleEntry[]) => new scheduleActions.LoadMyMonthScheduleSuccessAction(entries))
        .catch(error => Observable.of(new scheduleActions.LoadMyMonthScheduleFailAction(error)));
    });

}
