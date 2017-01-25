import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {EmployeeScheduleEntry} from '../../../STATE/models/employee-schedule-entry.model';
import {CalendarTypes} from '../../../STATE/models/calendar.types';
import {GroupSchedule} from '../../../STATE/models/group-schedule.model';
import {AppState} from '../../../STATE/models/app-state.model';
import {LoadGroupScheduleMonthsAction, SetMySelectedDateAction} from '../../../STATE/actions/schedule.actions';
import {scheduleSelectors, profileSelectors} from '../../../STATE/reducers/index';
import {Employee} from '../../../STATE/models/employee.model';
import {BottomSheetService} from '../../../bottom-sheet/bottom-sheet.service';
import {ViewTypeSwitcherComponent} from '../common/components/view-type-switcher/view-type-switcher.component';

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
  profile$: Observable<Employee>;
  loading$: Observable<boolean>;
  defaultEntries = [{LaborCode: 'OUT', ShiftCode: 'AM'}, {LaborCode: 'OUT', ShiftCode: 'AM'}];

  constructor(private store: Store<AppState>, private bss: BottomSheetService) {}

  ngOnInit() {
    this.activeMonths$ = this.store.select(scheduleSelectors.getScheduleMonths);
    this.entries$ = this.store.select(scheduleSelectors.getSelectedDateSchedule);
    this.selectedDate$ = this.store.select(scheduleSelectors.getMySelectedDate);
    this.homeViewType$ = this.store.select(scheduleSelectors.getHomeViewType);
    this.totalWorkCount$ = this.store.select(scheduleSelectors.getTotalWorkCount);
    this.estimateEarning$ = this.store.select(scheduleSelectors.getEstimateEarnings);
    this.loading$ = this.store.select(scheduleSelectors.getScheduleLoadingState);
    this.profile$ = this.store.select(profileSelectors.getMyProfile);
    this.store.dispatch(new LoadGroupScheduleMonthsAction());
  }

  onShiftClick(entry: EmployeeScheduleEntry) {
    this.bss.open(ViewTypeSwitcherComponent)
      .subscribe((result) => console.log(result), () => {}, () => console.log('finished'));
    console.log(entry.LaborCode);
  }

  onDateChange(date: Date) {
    this.store.dispatch(new SetMySelectedDateAction(date));
  }

  isNotDayView(viewType) {
    return viewType === CalendarTypes.WEEK || viewType === CalendarTypes.TWO_WEEK;
  }

}
