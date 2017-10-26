import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, createScheduleSelectors } from '../../../STATE/reducers/index';
import { LoadAllScheduleRequestsAction } from '../../../STATE/actions/create-schedule.actions';
import { CreateScheduleModel } from '../../../STATE/models/create-schedule.model';
import { Router } from '@angular/router';

@Component({
  selector: 'pcl-select-month-for-scheduling',
  templateUrl: './select-month-for-scheduling.component.html',
  styleUrls: ['./select-month-for-scheduling.component.scss']
})
export class SelectMonthForSchedulingComponent implements OnInit {
  scheduleRequests$: Observable<CreateScheduleModel[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new LoadAllScheduleRequestsAction());

    this.scheduleRequests$ = this.store.select(createScheduleSelectors.getAllScheduleRequests);
    this.loading$ = this.store.select(createScheduleSelectors.getLoading);
  }

  back() {
    this.router.navigate(['/', 'profile']);
  }

  goToCreateRequest(scheduleRequestID: number) {
    this.router.navigate(['/', 'create-schedule', scheduleRequestID]);
  }
}
