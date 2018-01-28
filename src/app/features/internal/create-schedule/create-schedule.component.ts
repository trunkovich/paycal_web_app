import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';

import { AppState, createScheduleSelectors, referenceSelectors } from '../../../STATE/reducers/index';
import * as createScheduleActions from '../../../STATE/actions/create-schedule.actions';
import { UpdateSREmployeeNotesAction, UpdateSRUseCompTimeAction } from '../../../STATE/actions/create-schedule.actions';
import { CreateScheduleDetailsModel } from '../../../STATE/models/create-schedule.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {
  CallNights,
  CallUnavailabilityDays,
  EducationLeaves,
  RequestCalendar,
  VacationDays,
  VolunteerShift,
  Weekend
} from './schedule-request-calendar.class';
import { MatVerticalStepper } from '@angular/material';
import {
  CreatePreferredOffWeekendRequest,
  CreateVolunteerShiftRequest,
  SubmitCallNightsRequest,
  SubmitCallUnavailabilityWindowRequest,
  SubmitEducationLeavesRequest,
  SubmitHospiralistRoundingRequest,
  SubmitVacationWindowRequest
} from '../../../STATE/models/requests/create-schedule-request.model';
import { Actions } from '@ngrx/effects';
import { CallUnavailabilityType } from '../../../STATE/models/call-unavailability-type.model';
import { LoadCallUnavailabilityTypesAction, LoadHospitalsAction, LoadShiftTypesAction } from '../../../STATE/actions/references.actions';
import { Hospital } from '../../../STATE/models/hospital.model';
import { ShiftType } from '../../../STATE/models/shift-type.model';
import { LocalStorageService } from 'ngx-localstorage';

@Component({
  selector: 'pcl-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit, OnDestroy, AfterViewInit {
  requestDetails: CreateScheduleDetailsModel;
  requestCalendar: RequestCalendar;
  loading$: Observable<boolean>;
  scheduleMonth: moment.Moment;
  deadline: moment.Moment;
  introductionShown;
  selectedIndex = 0;
  callUnavailabilityTypes$: Observable<CallUnavailabilityType[]>;
  hospitals$: Observable<Hospital[]>;
  shifts$: Observable<ShiftType[]>;
  isDeadlinePassed = false;
  actualStepFound = false;

  @ViewChild('stepper') stepper: MatVerticalStepper;

  sub: Subscription;
  sub2: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.callUnavailabilityTypes$ = this.store.select(referenceSelectors.getCallUnavailabilityTypes);
    this.hospitals$ = this.store.select(referenceSelectors.getHospitals);
    this.shifts$ = this.store.select(referenceSelectors.getShiftTypes);
    this.store.dispatch(new LoadCallUnavailabilityTypesAction());
    this.store.dispatch(new LoadHospitalsAction());
    this.store.dispatch(new LoadShiftTypesAction());

    this.sub = this.route.params
      .map(params => params.scheduleRequestID)
      .switchMap((scheduleRequestID: number) => {
        this.manageIntroductionShown(scheduleRequestID);

        this.store.dispatch(new createScheduleActions.SetSelectedScheduleRequestIdAction(scheduleRequestID));
        this.store.dispatch(new createScheduleActions.LoadScheduleRequestAction(scheduleRequestID));

        this.loading$ = this.store.select(createScheduleSelectors.getLoading);
        return this.store.select(createScheduleSelectors.getSelectedScheduleRequest);
      })
      .filter((requestDetails: CreateScheduleDetailsModel) => !!requestDetails)
      .subscribe((requestDetails: CreateScheduleDetailsModel) => {
        this.requestDetails = _.cloneDeep(requestDetails);
        this.requestCalendar = new RequestCalendar(this.requestDetails);
        this.scheduleMonth = moment({month: this.requestCalendar.month, year: this.requestCalendar.year});
        this.deadline = moment(requestDetails.ScheduleRequest.RequestDeadline);
        this.isDeadlinePassed = moment().isAfter(this.deadline);
        if (!this.actualStepFound) {
          this.openActualStep(this.stepper, this.requestCalendar);
        }
      });

    this.sub2 = this.actions$
      .ofType(
        createScheduleActions.ActionTypes.SUBMIT_VACATION_WINDOW_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_CALL_UNAVAILABILITY_WINDOW_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_EDUCATION_LEAVES_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_CALL_NIGHTS_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_OFF_WEEKENDS_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_HOSPITALIST_ROUNDINGS_SUCCESS,
        createScheduleActions.ActionTypes.SUBMIT_VOLUNTEER_SHIFT_SUCCESS,
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

  ngAfterViewInit() {
    if (!this.actualStepFound) {
      this.openActualStep(this.stepper, this.requestCalendar);
    }
  }

  openActualStep(stepper: MatVerticalStepper, calendar: RequestCalendar) {
    if (!stepper || !calendar) {
      return false;
    }
    this.actualStepFound = true;
    let stepsToMove = 0;
    if (calendar.isVacationWindowsValid()) {
      stepsToMove = 1;
    }
    if (calendar.isCallUnavailabilityWindowsValid()) {
      stepsToMove = 2;
    }
    if (calendar.isEducationLeavesValid()) {
      stepsToMove = 3;
    }
    if (calendar.isCallNightsValid()) {
      stepsToMove = 4;
    }
    if (!!calendar.offWeekend) {
      stepsToMove = 5;
    }
    if (calendar.hospitalistRoundings && _.every(calendar.hospitalistRoundings, rounding => !!rounding)) {
      stepsToMove = 6;
    }
    if (calendar.volunteerShift.date && calendar.volunteerShift.hospitalId && calendar.volunteerShift.shiftId) {
      stepsToMove = 7;
    }
    if (!calendar.offWeekend && stepsToMove > 4) {
      stepsToMove = 4;
    }
    if (!calendar.isCallNightsValid() && stepsToMove > 3) {
      stepsToMove = 3;
    }
    while (stepsToMove > 0) {
      this.stepper.next();
      stepsToMove--;
    }
  }

  back() {
    this.router.navigate(['/', 'select-schedule']);
  }

  manageIntroductionShown(scheduleRequestID: number) {
    let introductionShownStr = this.localStorageService.get('pc_cs_introduction');
    if (!introductionShownStr) {
      let tempObj = {};
      tempObj[scheduleRequestID] = true;
      this.localStorageService.set('pc_cs_introduction', JSON.stringify(tempObj));
      this.introductionShown = false;
    } else {
      let introductionShownObj;
      try {
        introductionShownObj = JSON.parse(introductionShownStr);
      } catch (e) {}
      if (!introductionShownObj) {
        introductionShownObj = {};
      }
      this.introductionShown = !!introductionShownObj[scheduleRequestID];
      introductionShownObj[scheduleRequestID] = true;
      this.localStorageService.set('pc_cs_introduction', JSON.stringify(introductionShownObj));
    }
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

  vacationDateChange(vacationDays: VacationDays) {
    this.requestCalendar = this.requestCalendar.setVacationDays(vacationDays);
  }

  onSubmitVacationDays() {
    let data: SubmitVacationWindowRequest = {
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      dates: _.map(this.requestCalendar.vacationDays, ({type, start, end}) => {
        return {
          type,
          start: start.format('L'),
          end: type === 2 ? end.format('L') : start.format('L')
        };
      })
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

  volunteerShiftChange(shift: VolunteerShift) {
    this.requestCalendar = this.requestCalendar.setVolunteerShift(shift);
  }

  volunteerShiftSubmit() {
    let data: CreateVolunteerShiftRequest = {
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      date: this.requestCalendar.volunteerShift.date && this.requestCalendar.volunteerShift.date.format('L'),
      hospitalID: this.requestCalendar.volunteerShift.hospitalId,
      shiftID: this.requestCalendar.volunteerShift.shiftId
    };
    this.store.dispatch(new createScheduleActions.SubmitVolunteerShiftAction(data));
  }

  submitCompTime(value: boolean) {
    this.store.dispatch(new UpdateSRUseCompTimeAction({
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      useCompTime: value
    }));
  }

  submitDetails(employeeNotes: string) {
    this.store.dispatch(new UpdateSREmployeeNotesAction({
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      employeeNotes
    }));
  }

}
