/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf, forkJoin as observableForkJoin, concat as observableСoncat } from 'rxjs';
import * as _ from 'lodash';

import * as createScheduleActions from '../actions/create-schedule.actions';
import { CreateScheduleService } from '../../core/services/create-schedule.service';
import { CreateScheduleDetailsModel, CreateScheduleModel } from '../models/create-schedule.model';
import {
  CreatePreferredOffWeekendRequest,
  CreateVolunteerShiftRequest,
  SubmitCallNightsRequest,
  SubmitCallUnavailabilityWindowRequest,
  SubmitEducationLeavesRequest,
  SubmitHospiralistRoundingRequest,
  SubmitVacationWindowRequest,
  UpdateScheduleRequestEmployeeNotesRequest,
  UpdateScheduleRequestUseCompTimeRequest
} from '../models/requests/create-schedule-request.model';
import { AppState, createScheduleSelectors } from '../reducers/index';
import { catchError, combineAll, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CreateScheduleEffects {
  constructor(private actions$: Actions, private createScheduleService: CreateScheduleService, private store: Store<AppState>) { }

  @Effect()
  getAllScheduleRequests: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS)
    .pipe(
      switchMap(() =>
        this.createScheduleService.getAllScheduleRequests()
          .pipe(
            map((requests: CreateScheduleModel[]) => new createScheduleActions.LoadAllScheduleRequestsSuccessAction(requests)),
            catchError(error => observableOf(new createScheduleActions.LoadAllScheduleRequestsFailAction(error)))
          )
      )
    );

  @Effect()
  getScheduleRequest: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.LOAD_SCHEDULE_REQUEST)
    .pipe(
      map((action: createScheduleActions.LoadScheduleRequestAction) => action.payload),
      switchMap((scheduleRequestID: number) =>
        this.createScheduleService.getScheduleRequestDetails(scheduleRequestID)
          .pipe(
            map((request: CreateScheduleDetailsModel) => new createScheduleActions.LoadScheduleRequestSuccessAction(request)),
            catchError(error => observableOf(new createScheduleActions.LoadScheduleRequestFailAction(error)))
          )
      )
    );

  @Effect()
  updateScheduleRequest: Observable<Action> = this.actions$
    .ofType(
      createScheduleActions.ActionTypes.SUBMIT_VACATION_WINDOW_SUCCESS,
      createScheduleActions.ActionTypes.SUBMIT_CALL_UNAVAILABILITY_WINDOW_SUCCESS,
      createScheduleActions.ActionTypes.SUBMIT_EDUCATION_LEAVES_SUCCESS,
      createScheduleActions.ActionTypes.SUBMIT_CALL_NIGHTS_SUCCESS,
      createScheduleActions.ActionTypes.SUBMIT_HOSPITALIST_ROUNDINGS_SUCCESS,
      createScheduleActions.ActionTypes.SUBMIT_OFF_WEEKENDS_SUCCESS,
      createScheduleActions.ActionTypes.SUBMIT_VOLUNTEER_SHIFT_SUCCESS,
      createScheduleActions.ActionTypes.UPDATE_SR_USE_COMP_TIME_SUCCESS,
      createScheduleActions.ActionTypes.UPDATE_SR_EMPLOYEE_NOTES_SUCCESS
    )
    .pipe(
      withLatestFrom(this.store.select(createScheduleSelectors.getSelectedScheduleRequestId)),
      switchMap(([__, scheduleRequestID]) =>
        this.createScheduleService.getScheduleRequestDetails(scheduleRequestID)
          .pipe(
            map((request: CreateScheduleDetailsModel) => new createScheduleActions.LoadScheduleRequestSuccessAction(request)),
            catchError(error => observableOf(new createScheduleActions.LoadScheduleRequestFailAction(error)))
          )
      )
    );

  @Effect()
  submitVacationWindows: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_VACATION_WINDOW)
    .pipe(
      map((action: createScheduleActions.SubmitVacationWindowAction) => action.payload),
      switchMap(({scheduleRequestId, dates}: SubmitVacationWindowRequest) =>
        this.createScheduleService.deleteVacationWindows(scheduleRequestId)
          .pipe(
            switchMap(() =>
              observableForkJoin(_.map(dates, (date) =>
                this.createScheduleService.createVacationWindow({
                  scheduleRequestId: scheduleRequestId,
                  vacationWindowTypeID: date.type,
                  startDate: date.start,
                  endDate: date.end
                })
              ))
            ),
            map(() => new createScheduleActions.SubmitVacationWindowSuccessAction()),
            catchError(error => observableOf(new createScheduleActions.SubmitVacationWindowFailAction(error)))
          )
      )
    );

  @Effect()
  submiCallUnavailabilityWindows: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_CALL_UNAVAILABILITY_WINDOW)
    .pipe(
      map((action: createScheduleActions.SubmitCallUnavailabilityWindowAction) => action.payload),
      switchMap(({scheduleRequestId, dates}: SubmitCallUnavailabilityWindowRequest) =>
        this.createScheduleService.deleteCallUnavailabilityWindows(scheduleRequestId)
          .pipe(
            mergeMap(() =>
              observableForkJoin(_.map(dates, (day) =>
                this.createScheduleService.createCallUnavailabilityWindow({
                  scheduleRequestId: scheduleRequestId,
                  callUnavailabilityTypeID: day.type,
                  date: day.date
                })
              ))
            ),
            map(() => new createScheduleActions.SubmitCallUnavailabilityWindowSuccessAction()),
            catchError(error => observableOf(new createScheduleActions.SubmitCallUnavailabilityWindowFailAction(error)))
          )
      )
    );

  @Effect()
  submiEducationLeaves: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_EDUCATION_LEAVES)
    .pipe(
      map((action: createScheduleActions.SubmitEducationLeavesAction) => action.payload),
      switchMap(({scheduleRequestId, dates}: SubmitEducationLeavesRequest) =>
        this.createScheduleService.deleteEducationalLeaves(scheduleRequestId)
          .pipe(
            switchMap(() =>
              observableForkJoin(_.map(dates, (day) =>
                this.createScheduleService.createEducationalLeave({
                  scheduleRequestId: scheduleRequestId,
                  date: day.date,
                  activityName: day.name,
                  activityDescription: day.description
                })
              ))
            ),
            map(() => new createScheduleActions.SubmitEducationLeavesSuccessAction()),
            catchError(error => observableOf(new createScheduleActions.SubmitEducationLeavesFailAction(error)))
          )
      )
    );

  @Effect()
  submiCallNights: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_CALL_NIGHTS)
    .pipe(
      map((action: createScheduleActions.SubmitCallNightsAction) => action.payload),
      switchMap(({scheduleRequestId, dates}: SubmitCallNightsRequest) =>
        this.createScheduleService.deletePreferredCallNights(scheduleRequestId)
          .pipe(
            switchMap(() => {
              const createCallNightRequests = _.map(dates, (day, key) =>
                this.createScheduleService.createPreferredCallNight({
                  scheduleRequestId: scheduleRequestId,
                  date: day,
                  callNightTypeID: +key
                })
              );
              return observableСoncat(...createCallNightRequests);
            }),
            combineAll(),
            catchError(error => observableOf(new createScheduleActions.SubmitCallNightsFailAction(error)))
          )
      ),
      map(() => new createScheduleActions.SubmitCallNightsSuccessAction())
    );

  @Effect()
  submitOffWeekends: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_OFF_WEEKENDS)
    .pipe(
      map((action: createScheduleActions.SubmitOffWeekendsAction) => action.payload),
      switchMap((data: CreatePreferredOffWeekendRequest) =>
        this.createScheduleService.deletePreferredOffWeekends(data.scheduleRequestId)
          .pipe(
            switchMap(() => this.createScheduleService.createPreferredOffWeekend(data)),
            map(() => new createScheduleActions.SubmitOffWeekendsSuccessAction()),
            catchError(error => observableOf(new createScheduleActions.SubmitOffWeekendsFailAction(error)))
          )
      )
    );

  @Effect()
  submitHospitalistRounding: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_HOSPITALIST_ROUNDINGS)
    .pipe(
      map((action: createScheduleActions.SubmitHospitalistRoundingsAction) => action.payload),
      switchMap(({dates, scheduleRequestId}: SubmitHospiralistRoundingRequest) =>
        this.createScheduleService.deleteHospitalRoundings(scheduleRequestId)
          .pipe(
            switchMap(() =>
              observableForkJoin(_.map(dates, (data, index) => {
                if (data) {
                  return this.createScheduleService.createHospitalRounding({
                    scheduleRequestId: scheduleRequestId,
                    roundingTypeID: index + 1,
                    startDate: data.start,
                    endDate: data.end
                  });
                } else {
                  return observableOf(true);
                }
              }))
            ),
            map(() => new createScheduleActions.SubmitHospitalistRoundingsSuccessAction()),
            catchError(error => observableOf(new createScheduleActions.SubmitHospitalistRoundingsFailAction(error)))
          )
      )
    );

  @Effect()
  submitVolunteerShift: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_VOLUNTEER_SHIFT)
    .pipe(
      map((action: createScheduleActions.SubmitVolunteerShiftAction) => action.payload),
      switchMap((data: CreateVolunteerShiftRequest) =>
        this.createScheduleService.deleteVolunteerShifts(data.scheduleRequestId)
          .pipe(
            switchMap(() => {
              if (data.date) {
                return this.createScheduleService.createVolunteerShift(data);
              } else {
                return observableOf(true);
              }
            }),
            map(() => new createScheduleActions.SubmitVolunteerShiftSuccessAction()),
            catchError(error => observableOf(new createScheduleActions.SubmitVolunteerShiftFailAction(error)))
          )
      )
    );

  @Effect()
  updateCompTime: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.UPDATE_SR_USE_COMP_TIME)
    .pipe(
      map((action: createScheduleActions.UpdateSRUseCompTimeAction) => action.payload),
      switchMap((data: UpdateScheduleRequestUseCompTimeRequest) =>
        this.createScheduleService.updateScheduleRequestUseCompTime(data)
          .pipe(
            map(() => new createScheduleActions.UpdateSRUseCompTimeSuccessAction()),
            catchError(error => observableOf(new createScheduleActions.UpdateSRUseCompTimeFailAction(error)))
          )
      )
    );

  @Effect()
  updateEmployeeNotes: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.UPDATE_SR_EMPLOYEE_NOTES)
    .pipe(
      map((action: createScheduleActions.UpdateSREmployeeNotesAction) => action.payload),
      switchMap((data: UpdateScheduleRequestEmployeeNotesRequest) =>
        this.createScheduleService.updateScheduleRequestEmployeeNotes(data)
          .pipe(
            map(() => new createScheduleActions.UpdateSREmployeeNotesSuccessAction()),
            catchError(error => observableOf(new createScheduleActions.UpdateSREmployeeNotesFailAction(error)))
          )
      )
    );
}
