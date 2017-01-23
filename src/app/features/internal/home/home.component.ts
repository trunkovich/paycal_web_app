import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {EmployeeScheduleEntry} from '../../../STATE/models/employee-schedule-entry.model';
import {CalendarTypes} from '../../../STATE/models/calendar.types';
import {GroupSchedule} from '../../../STATE/models/group-schedule.model';
import {AppState} from '../../../STATE/models/app-state.model';
import {LoadGroupScheduleMonthsAction, SetMySelectedDateAction} from '../../../STATE/actions/schedule.actions';
import {scheduleSelectors} from '../../../STATE/reducers/index';

@Component({
  selector: 'pcl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeMonths$: Observable<GroupSchedule[]>;
  entries$: Observable<EmployeeScheduleEntry[]>;
  selectedDate$: Observable<Date>;
  homeViewType$: Observable<CalendarTypes>;
  totalWorkCount$: Observable<number>;
  estimateEarning$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.activeMonths$ = this.store.select(scheduleSelectors.getScheduleMonths);
    this.entries$ = this.store.select(scheduleSelectors.getSelectedDateSchedule);
    this.selectedDate$ = this.store.select(scheduleSelectors.getMySelectedDate);
    this.homeViewType$ = this.store.select(scheduleSelectors.getHomeViewType);
    this.totalWorkCount$ = this.store.select(scheduleSelectors.getTotalWorkCount);
    this.estimateEarning$ = this.store.select(scheduleSelectors.getEstimateEarnings);
    this.store.dispatch(new LoadGroupScheduleMonthsAction());
  }

  onShiftClick(entry: EmployeeScheduleEntry) {
    console.log(entry.LaborCode);
  }

  onDateChange(date: Date) {
    this.store.dispatch(new SetMySelectedDateAction(date));
  }

  isNotDayView(viewType) {
    return viewType === CalendarTypes.WEEK || viewType === CalendarTypes.TWO_WEEK;
  }

}
