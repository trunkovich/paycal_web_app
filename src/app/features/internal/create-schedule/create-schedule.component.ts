import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';

import { AppState, createScheduleSelectors } from '../../../STATE/reducers/index';
import { LoadScheduleRequestAction, SetSelectedScheduleRequestIdAction } from '../../../STATE/actions/create-schedule.actions';
import { CreateScheduleDetailsModel } from '../../../STATE/models/create-schedule.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RequestCalendar } from './schedule-request-calendar.class';

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
  introductionShown = false;
  selectedIndex = 0;

  sub: Subscription;

  constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params
      .map(params => params.scheduleRequestID)
      .switchMap((scheduleRequestID: number) => {
        this.store.dispatch(new SetSelectedScheduleRequestIdAction(scheduleRequestID));
        this.store.dispatch(new LoadScheduleRequestAction(scheduleRequestID));

        this.loading$ = this.store.select(createScheduleSelectors.getLoading);
        return this.store.select(createScheduleSelectors.getSelectedScheduleRequest);
      })
      .filter((requestDetails: CreateScheduleDetailsModel) => !!requestDetails)
      .subscribe((requestDetails: CreateScheduleDetailsModel) => {
        this.requestDetails = _.cloneDeep(requestDetails);
        this.requestCalendar = new RequestCalendar(this.requestDetails);
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
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

}
