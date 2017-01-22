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
import {AvailableMonthsStructure, LoadedMonth} from '../models/employee-schedule-entry.model';
import {AppState, scheduleSelectors} from '../reducers/index';

@Injectable()
export class ScheduleEffects {
  constructor(
    private actions$: Actions,
    private scheduleService: ScheduleService,
    private store: Store<AppState>
  ) {}

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
  getAllAvailableMonthsSchedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS)
    .withLatestFrom(this.store.select(scheduleSelectors.getFullSchedule))
    .switchMap(([, months]: [any, AvailableMonthsStructure]) => {
      return this.scheduleService.loadMonths(months)
        .map((loadedMonth: LoadedMonth) => new scheduleActions.LoadMyMonthScheduleSuccessAction(loadedMonth))
        .catch(error => Observable.of(new scheduleActions.LoadMyMonthScheduleFailAction(error)));
    });

}
