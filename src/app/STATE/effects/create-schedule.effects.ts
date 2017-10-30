/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as createScheduleActions from '../actions/create-schedule.actions';
import { CreateScheduleService } from '../../core/services/create-schedule.service';
import { CreateScheduleDetailsModel, CreateScheduleModel } from '../models/create-schedule.model';
import { SubmitVacationWindowRequest } from '../models/requests/create-schedule-request.model';

@Injectable()
export class CreateScheduleEffects {
  constructor(private actions$: Actions, private createScheduleService: CreateScheduleService) { }

  // @Effect()
  // initGetAllScheduleRequests: Observable<Action> = this.actions$
  //   .ofType(
  //     authActions.ActionTypes.SIGN_IN_SUCCESS,
  //     authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS,
  //     authActions.ActionTypes.READ_TOKEN_SUCCESS,
  //   )
  //   .map(() => new createScheduleActions.LoadAllScheduleRequestsAction())
  //   .delay(1);

  @Effect()
  getAllScheduleRequests: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS)
    .switchMap(() => {
      return this.createScheduleService.getAllScheduleRequests()
        .map((requests: CreateScheduleModel[]) => new createScheduleActions.LoadAllScheduleRequestsSuccessAction(requests))
        .catch(error => Observable.of(new createScheduleActions.LoadAllScheduleRequestsFailAction(error)));
    });

  @Effect()
  getScheduleRequest: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.LOAD_SCHEDULE_REQUEST)
    .map((action: createScheduleActions.LoadScheduleRequestAction) => action.payload)
    .switchMap((scheduleRequestID: number) => {
      return this.createScheduleService.getScheduleRequestDetails(scheduleRequestID)
        .map((request: CreateScheduleDetailsModel) => new createScheduleActions.LoadScheduleRequestSuccessAction(request))
        .catch(error => Observable.of(new createScheduleActions.LoadScheduleRequestFailAction(error)));
    });

  @Effect()
  submitVacationWindows: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_VACATION_WINDOW)
    .map((action: createScheduleActions.SubmitVacationWindowAction) => action.payload)
    .switchMap(({scheduleRequestId, dates}: SubmitVacationWindowRequest) => {
      return this.createScheduleService.deleteVacationWindows(scheduleRequestId)
        .switchMap(() => {
          return Observable.forkJoin(_.map(dates, (date) => {
            return this.createScheduleService.createVacationWindow({
              scheduleRequestId: scheduleRequestId,
              vacationWindowTypeID: dates.length > 1 ? 2 : 1,
              startDate: date,
              endDate: date
            })
          }))
        })
        .map(() => new createScheduleActions.SubmitVacationWindowSuccessAction())
        .catch(error => Observable.of(new createScheduleActions.LoadScheduleRequestFailAction(error)));
    });
}
