import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as moment from 'moment';
import {Router} from '@angular/router';

import {EmployeeScheduleEntry, EmployeeScheduleEntryGroupedByDay} from '../../../STATE/models/employee-schedule-entry.model';
import {CalendarTypes} from '../../../STATE/models/calendar.types';
import {GroupSchedule} from '../../../STATE/models/group-schedule.model';
import {homeSelectors, profileSelectors, AppState, scheduleSelectors} from '../../../STATE/reducers/index';
import {Employee} from '../../../STATE/models/employee.model';
import {INTERNAL_ROUTES} from '../internal.routes';
import {APP_CONFIG} from '../../../../environments/environment';
import {SetMySelectedDateAction, SetHomeViewTypeAction} from '../../../STATE/actions/home.actions';
import {SetCurrentSectionAction} from '../../../STATE/actions/schedule.actions';

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
  summaryEnabled = APP_CONFIG.SHOW_SUMMARY;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new SetCurrentSectionAction('home'));
    this.activeMonths$ = this.store.select(scheduleSelectors.getScheduleMonths);
    this.entries$ = this.store.select(homeSelectors.getHomeSortedSelectedDateSchedule);
    this.groupedEntries$ = this.store.select(homeSelectors.getHomeSelectedDateScheduleGroupedByDay);
    this.selectedDate$ = this.store.select(homeSelectors.getHomeSelectedDate);
    this.homeViewType$ = this.store.select(homeSelectors.getHomeViewType);
    this.totalWorkCount$ = this.store.select(homeSelectors.getTotalWorkCount);
    this.estimateEarning$ = this.store.select(homeSelectors.getEstimateEarnings);
    this.loading$ = this.store.select(homeSelectors.getHomeLoadingState);
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
