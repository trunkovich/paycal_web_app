/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as createScheduleActions from '../actions/create-schedule.actions';
import { CreateScheduleService } from '../../core/services/create-schedule.service';
import { CreateScheduleModel } from '../models/create-schedule.model';

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
}
