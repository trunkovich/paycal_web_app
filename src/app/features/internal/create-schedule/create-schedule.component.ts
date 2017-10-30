import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';

import { AppState, createScheduleSelectors } from '../../../STATE/reducers/index';
import * as createScheduleActions from '../../../STATE/actions/create-schedule.actions';
import { CreateScheduleDetailsModel } from '../../../STATE/models/create-schedule.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RequestCalendar } from './schedule-request-calendar.class';
import { MdVerticalStepper } from '@angular/material';
import { SubmitVacationWindowRequest } from '../../../STATE/models/requests/create-schedule-request.model';
import { Actions } from '@ngrx/effects';

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
      .ofType(createScheduleActions.ActionTypes.SUBMIT_VACATION_WINDOW_SUCCESS)
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

  vacationDateChange(dates: moment.Moment[]) {
    this.requestCalendar = this.requestCalendar.setVacationDays(dates);
  }

  nextStep() {
    this.stepper.next();
  }

  onSubmitVacationDays() {
    let data: SubmitVacationWindowRequest = {
      scheduleRequestId: this.requestDetails.ScheduleRequest.ScheduleRequestID,
      dates: _.map(this.requestCalendar.vacationDays, (day) => day.format('L'))
    };
    this.store.dispatch(new createScheduleActions.SubmitVacationWindowAction(data));
  }

}
