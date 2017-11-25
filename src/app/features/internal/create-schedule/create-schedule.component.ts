import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';

import { AppState, createScheduleSelectors, referenceSelectors } from '../../../STATE/reducers/index';
import * as createScheduleActions from '../../../STATE/actions/create-schedule.actions';
import { CreateScheduleDetailsModel } from '../../../STATE/models/create-schedule.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CallNights, CallUnavailabilityDays, EducationLeaves, RequestCalendar, Weekend } from './schedule-request-calendar.class';
import { MdVerticalStepper } from '@angular/material';
import {
  CreatePreferredOffWeekendRequest,
  SubmitCallNightsRequest,
  SubmitCallUnavailabilityWindowRequest,
  SubmitEducationLeavesRequest,
  SubmitHospiralistRoundingRequest,
  SubmitVacationWindowRequest
} from '../../../STATE/models/requests/create-schedule-request.model';
import { Actions } from '@ngrx/effects';
import { CallUnavailabilityType } from '../../../STATE/models/call-unavailability-type.model';
import { LoadCallUnavailabilityTypesAction } from '../../../STATE/actions/references.actions';

@Component({
  selector: 'pcl-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit, OnDestroy {
  requestDetails: CreateScheduleDetailsModel;
  requestCalendar: RequestCalendar;
  loading$: Observable<boolean>;
  scheduleMonth = moment().add(5, 'month');
  deadline = moment().startOf('month').date(15);
  introductionShown = true;
  selectedIndex = 0;
  callUnavailabilityTypes$: Observable<CallUnavailabilityType[]>;

  @ViewChild('stepper') stepper: MdVerticalStepper;

  sub: Subscription;
  sub2: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private actions$: Actions
  ) {}

  ngOnInit() {
    this.callUnavailabilityTypes$ = this.store.select(referenceSelectors.getCallUnavailabilityTypes);
    this.store.dispatch(new LoadCallUnavailabilityTypesAction());

    this.sub = this.route.params
      .map(params => params.scheduleRequestID)
      .switchMap((scheduleRequestID: number) => {
        this.store.dispatch(new createScheduleActions.SetSelectedScheduleRequestIdAction(scheduleRequestID));
        this.store.dispatch(new createScheduleActions.LoadScheduleRequestAction(scheduleRequestID));

        this.loading$ = this.store.select(createScheduleSelectors.getLoading);
        return this.store.select(createScheduleSelectors.getSelectedScheduleRequest);
      })
      .filter((requestDetails: CreateScheduleDetailsModel) => !!requestDetails)
      .subscribe((requestDetails: CreateScheduleDetailsModel) => {
        this.requestDetails = _.cloneDeep(requestDetails);
        this.requestCalendar = new RequestCalendar(this.requestDetails);
      });

    this.sub2 = this.actions$
      .ofType(
        createScheduleActions.ActionTypes.SUBMIT_VACATION_WINDOW_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_CALL_UNAVAILABILITY_WINDOW_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_EDUCATION_LEAVES_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_CALL_NIGHTS_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_OFF_WEEKENDS_SUCCESS,
      )
      .subscribe(() => this.nextStep());
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  back() {
    this.router.navigate(['/', 'select-schedule']);
  }

  start() {
    this.introductionShown = true;
  }

  selectionChange(data) {
    this.selectedIndex = data.selectedIndex;
  }

  nextStep() {
    this.stepper.next();
  }

  vacationDateChange(dates: moment.Moment[]) {
    this.requestCalendar = this.requestCalendar.setVacationDays(dates);
  }

  onSubmitVacationDays() {
    let data: SubmitVacationWindowRequest = {
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      dates: _.map(this.requestCalendar.vacationDays, (day) => day.format('L'))
    };
    this.store.dispatch(new createScheduleActions.SubmitVacationWindowAction(data));
  }

  callUnavailabilityDateChange(dates: CallUnavailabilityDays) {
    this.requestCalendar = this.requestCalendar.setCallUnavailabilityDays(dates);
  }

  onSubmitCallUnavailabilityDays() {
    let data: SubmitCallUnavailabilityWindowRequest = {
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      dates: _.map(this.requestCalendar.callUnavailabilityDates, (day) => {
        return { date: day.date.format('L'), type: day.type };
      })
    };
    this.store.dispatch(new createScheduleActions.SubmitCallUnavailabilityWindowAction(data));
  }

  educationLeavesChange(dates: EducationLeaves) {
    this.requestCalendar = this.requestCalendar.setEducationLeaves(dates);
  }

  onSubmitEducationLeaves() {
    let data: SubmitEducationLeavesRequest = {
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      dates: _.map(this.requestCalendar.educationLeaves, (day) => {
        return { date: day.date.format('L'), name: day.name, description: day.description };
      })
    };
    this.store.dispatch(new createScheduleActions.SubmitEducationLeavesAction(data));
  }

  callNightsChange(dates: CallNights) {
    this.requestCalendar = this.requestCalendar.setCallNights(dates);
  }

  onSubmitCallNights() {
    let nights = {};
    _.each(this.requestCalendar.callNights, (day, key) => {
      if (day) {
        nights[key] = day ? day.format('L') : null;
      }
    });
    let data: SubmitCallNightsRequest = {
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      dates: nights
    };
    this.store.dispatch(new createScheduleActions.SubmitCallNightsAction(data));
  }

  offWeekendChange(weekend: Weekend) {
    this.requestCalendar = this.requestCalendar.setOffWeekends(weekend);
  }

  offWeekendSubmit() {
    let weekend = this.requestCalendar.offWeekend;
    let data: CreatePreferredOffWeekendRequest = {
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      label: weekend.label,
      startDate: weekend.start.format('L'),
      endDate: weekend.end.format('L')
    };
    this.store.dispatch(new createScheduleActions.SubmitOffWeekendsAction(data));
  }

  hospitalistRoundingsChange(weeks: moment.Moment[]) {
    this.requestCalendar = this.requestCalendar.setHospitalistRoundings(weeks);
  }

  hospitalistRoundingsSubmit() {
    let data: SubmitHospiralistRoundingRequest = {
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      dates: _.map(this.requestCalendar.hospitalistRoundings, (day) => {
        return !day ? null : {
          start: day.format('L'),
          end: moment(day).endOf('week').format('L')
        }
      })
    };
    this.store.dispatch(new createScheduleActions.SubmitHospitalistRoundingsAction(data));
  }

}
