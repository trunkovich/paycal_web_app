import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as moment from 'moment';

import {
  EmployeeScheduleEntry,
  EmployeeScheduleEntryGroupedByDay
} from '../../../STATE/models/employee-schedule-entry.model';
import {CalendarTypes} from '../../../STATE/models/calendar.types';
import {GroupSchedule} from '../../../STATE/models/group-schedule.model';
import {
  SetMySelectedDateAction,
  SetHomeViewTypeAction
} from '../../../STATE/actions/schedule.actions';
import {scheduleSelectors, profileSelectors, AppState} from '../../../STATE/reducers/index';
import {Employee} from '../../../STATE/models/employee.model';
import {Router} from '@angular/router';
import {INTERNAL_ROUTES} from '../internal.routes';

@Component({
  selector: 'pcl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeMonths$: Observable<GroupSchedule[]>;
  entries$: Observable<EmployeeScheduleEntry[]>;
  groupedEntries$: Observable<EmployeeScheduleEntryGroupedByDay[]>;
  selectedDate$: Observable<Date>;
  homeViewType$: Observable<CalendarTypes>;
  totalWorkCount$: Observable<number>;
  estimateEarning$: Observable<number>;
  profile$: Observable<Employee>;
  loading$: Observable<boolean>;
  defaultEntries = [{LaborCode: 'OUT', ShiftCode: 'AM'}, {LaborCode: 'OUT', ShiftCode: 'AM'}];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.activeMonths$ = this.store.select(scheduleSelectors.getScheduleMonths);
    this.entries$ = this.store.select(scheduleSelectors.getSortedSelectedDateSchedule);
    this.groupedEntries$ = this.store.select(scheduleSelectors.getSelectedDateScheduleGroupedByDay);
    this.selectedDate$ = this.store.select(scheduleSelectors.getMySelectedDate);
    this.homeViewType$ = this.store.select(scheduleSelectors.getHomeViewType);
    this.totalWorkCount$ = this.store.select(scheduleSelectors.getTotalWorkCount);
    this.estimateEarning$ = this.store.select(scheduleSelectors.getEstimateEarnings);
    this.loading$ = this.store.select(scheduleSelectors.getScheduleLoadingState);
    this.profile$ = this.store.select(profileSelectors.getMyProfile);
  }

  onShiftClick(entry: EmployeeScheduleEntry) {
    this.router.navigate(['/', INTERNAL_ROUTES.QUALIFIED_PHYSICIANS, entry.EmployeeScheduleEntryID]);
  }

  onDateChange(date: Date) {
    this.store.dispatch(new SetMySelectedDateAction(date));
  }

  isNotDayView(viewType) {
    return viewType === CalendarTypes.WEEK || viewType === CalendarTypes.TWO_WEEK;
  }

  isDayView(viewType) {
    return viewType === CalendarTypes.DAY;
  }

  onDayClick(day: EmployeeScheduleEntryGroupedByDay) {
    this.store.dispatch(new SetMySelectedDateAction(day.date.toDate()));
    this.store.dispatch(new SetHomeViewTypeAction(CalendarTypes.DAY));
  }

  formattedTitle(profile: Employee): string {
    if (!profile) {
      return '';
    }
    if (profile.EmployeePositionID === 2) {
      return `Dr. ${profile.FirstName} ${profile.LastName}, MD.`;
    }
    return `${profile.FirstName} ${profile.LastName}`;
  }

  isEntryInPast(entry: EmployeeScheduleEntry): boolean {
    let m = moment({year: entry.Year, month: entry.Month - 1, day: entry.Day});
    let endOfToday = moment().endOf('day');
    return m.isBefore(endOfToday);
  }

}
