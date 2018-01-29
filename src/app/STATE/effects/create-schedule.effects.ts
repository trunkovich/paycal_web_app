/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
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
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CreateScheduleEffects {
  constructor(private actions$: Actions, private createScheduleService: CreateScheduleService, private store: Store<AppState>) { }

  @Effect()
  getAllScheduleRequests: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS)
    .pipe(
      switchMap(() => this.createScheduleService.getAllScheduleRequests()),
      map((requests: CreateScheduleModel[]) => new createScheduleActions.LoadAllScheduleRequestsSuccessAction(requests)),
      catchError(error => Observable.of(new createScheduleActions.LoadAllScheduleRequestsFailAction(error)))
    );

  @Effect()
  getScheduleRequest: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.LOAD_SCHEDULE_REQUEST)
    .pipe(
      map((action: createScheduleActions.LoadScheduleRequestAction) => action.payload),
      switchMap((scheduleRequestID: number) => this.createScheduleService.getScheduleRequestDetails(scheduleRequestID)),
      map((request: CreateScheduleDetailsModel) => new createScheduleActions.LoadScheduleRequestSuccessAction(request)),
      catchError(error => Observable.of(new createScheduleActions.LoadScheduleRequestFailAction(error)))
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
    )
    .pipe(
      withLatestFrom(this.store.select(createScheduleSelectors.getSelectedScheduleRequestId)),
      switchMap(([__, scheduleRequestID]) => this.createScheduleService.getScheduleRequestDetails(scheduleRequestID)),
      map((request: CreateScheduleDetailsModel) => new createScheduleActions.LoadScheduleRequestSuccessAction(request)),
      catchError(error => Observable.of(new createScheduleActions.LoadScheduleRequestFailAction(error)))
    );

  @Effect()
  submitVacationWindows: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_VACATION_WINDOW)
    .pipe(
      map((action: createScheduleActions.SubmitVacationWindowAction) => action.payload),
      switchMap(({scheduleRequestId, dates}: SubmitVacationWindowRequest) => {
        return this.createScheduleService.deleteVacationWindows(scheduleRequestId)
          .pipe(
            switchMap(() => {
              return Observable.forkJoin(_.map(dates, (date) => {
                return this.createScheduleService.createVacationWindow({
                  scheduleRequestId: scheduleRequestId,
                  vacationWindowTypeID: date.type,
                  startDate: date.start,
                  endDate: date.end
                })
              }))
            })
          );
      }),
      map(() => new createScheduleActions.SubmitVacationWindowSuccessAction()),
      catchError(error => Observable.of(new createScheduleActions.SubmitVacationWindowFailAction(error)))
    );

  @Effect()
  submiCallUnavailabilityWindows: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_CALL_UNAVAILABILITY_WINDOW)
    .pipe(
      map((action: createScheduleActions.SubmitCallUnavailabilityWindowAction) => action.payload),
      switchMap(({scheduleRequestId, dates}: SubmitCallUnavailabilityWindowRequest) => {
        return this.createScheduleService.deleteCallUnavailabilityWindows(scheduleRequestId)
          .pipe(
            mergeMap(() => {
              return Observable.forkJoin(_.map(dates, (day) => {
                return this.createScheduleService.createCallUnavailabilityWindow({
                  scheduleRequestId: scheduleRequestId,
                  callUnavailabilityTypeID: day.type,
                  date: day.date
                })
              }))
            })
          );
      }),
      map(() => new createScheduleActions.SubmitCallUnavailabilityWindowSuccessAction()),
      catchError(error => Observable.of(new createScheduleActions.SubmitCallUnavailabilityWindowFailAction(error)))
    );

  @Effect()
  submiEducationLeaves: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_EDUCATION_LEAVES)
    .pipe(
      map((action: createScheduleActions.SubmitEducationLeavesAction) => action.payload),
      switchMap(({scheduleRequestId, dates}: SubmitEducationLeavesRequest) => {
        return this.createScheduleService.deleteEducationalLeaves(scheduleRequestId)
          .pipe(
            switchMap(() => {
              return Observable.forkJoin(_.map(dates, (day) => {
                return this.createScheduleService.createEducationalLeave({
                  scheduleRequestId: scheduleRequestId,
                  date: day.date,
                  activityName: day.name,
                  activityDescription: day.description
                })
              }))
            })
          );
      }),
      map(() => new createScheduleActions.SubmitEducationLeavesSuccessAction()),
      catchError(error => Observable.of(new createScheduleActions.SubmitEducationLeavesFailAction(error)))
    );

  @Effect()
  submiCallNights: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_CALL_NIGHTS)
    .pipe(
      map((action: createScheduleActions.SubmitCallNightsAction) => action.payload),
      switchMap(({scheduleRequestId, dates}: SubmitCallNightsRequest) => {
        return this.createScheduleService.deletePreferredCallNights(scheduleRequestId)
          .pipe(
            switchMap(() => {
              return Observable.forkJoin(_.map(dates, (day, key) => {
                return this.createScheduleService.createPreferredCallNight({
                  scheduleRequestId: scheduleRequestId,
                  date: day,
                  callNightTypeID: +key
                })
              }))
            })
          );
      }),
      map(() => new createScheduleActions.SubmitCallNightsSuccessAction()),
      catchError(error => Observable.of(new createScheduleActions.SubmitCallNightsFailAction(error)))
    );

  @Effect()
  submitOffWeekends: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_OFF_WEEKENDS)
    .pipe(
      map((action: createScheduleActions.SubmitOffWeekendsAction) => action.payload),
      switchMap((data: CreatePreferredOffWeekendRequest) => {
        return this.createScheduleService.deletePreferredOffWeekends(data.scheduleRequestId)
          .pipe(
            switchMap(() => this.createScheduleService.createPreferredOffWeekend(data))
          );
      }),
      map(() => new createScheduleActions.SubmitOffWeekendsSuccessAction()),
      catchError(error => Observable.of(new createScheduleActions.SubmitOffWeekendsFailAction(error)))
    );

  @Effect()
  submitHospitalistRounding: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_HOSPITALIST_ROUNDINGS)
    .pipe(
      map((action: createScheduleActions.SubmitHospitalistRoundingsAction) => action.payload),
      switchMap(({dates, scheduleRequestId}: SubmitHospiralistRoundingRequest) => {
        return this.createScheduleService.deleteHospitalRoundings(scheduleRequestId)
          .pipe(
            switchMap(() => {
              return Observable.forkJoin(_.map(dates, (data, index) => {
                if (data) {
                  return this.createScheduleService.createHospitalRounding({
                    scheduleRequestId: scheduleRequestId,
                    roundingTypeID: index + 1,
                    startDate: data.start,
                    endDate: data.end
                  });
                } else {
                  return Observable.of(true);
                }
              }))
            })
          );
      }),
      map(() => new createScheduleActions.SubmitHospitalistRoundingsSuccessAction()),
      catchError(error => Observable.of(new createScheduleActions.SubmitHospitalistRoundingsFailAction(error)))
    );

  @Effect()
  submitVolunteerShift: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.SUBMIT_VOLUNTEER_SHIFT)
    .pipe(
      map((action: createScheduleActions.SubmitVolunteerShiftAction) => action.payload),
      switchMap((data: CreateVolunteerShiftRequest) => {
        return this.createScheduleService.deleteVolunteerShifts(data.scheduleRequestId)
          .pipe(
            switchMap(() => {
              if (data.date) {
                return this.createScheduleService.createVolunteerShift(data);
              } else {
                return Observable.of(true);
              }
            })
          );
      }),
      map(() => new createScheduleActions.SubmitVolunteerShiftSuccessAction()),
      catchError(error => Observable.of(new createScheduleActions.SubmitVolunteerShiftFailAction(error)))
    );

  @Effect()
  updateCompTime: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.UPDATE_SR_USE_COMP_TIME)
    .pipe(
      map((action: createScheduleActions.UpdateSRUseCompTimeAction) => action.payload),
      switchMap((data: UpdateScheduleRequestUseCompTimeRequest) => {
        return this.createScheduleService.updateScheduleRequestUseCompTime(data);
      }),
      map(() => new createScheduleActions.UpdateSRUseCompTimeSuccessAction()),
      catchError(error => Observable.of(new createScheduleActions.UpdateSRUseCompTimeFailAction(error)))
    );

  @Effect()
  updateEmployeeNotes: Observable<Action> = this.actions$
    .ofType(createScheduleActions.ActionTypes.UPDATE_SR_EMPLOYEE_NOTES)
    .pipe(
      map((action: createScheduleActions.UpdateSREmployeeNotesAction) => action.payload),
      switchMap((data: UpdateScheduleRequestEmployeeNotesRequest) => {
        return this.createScheduleService.updateScheduleRequestEmployeeNotes(data);
      }),
      map(() => new createScheduleActions.UpdateSREmployeeNotesSuccessAction()),
      catchError(error => Observable.of(new createScheduleActions.UpdateSREmployeeNotesFailAction(error)))
    );
}
