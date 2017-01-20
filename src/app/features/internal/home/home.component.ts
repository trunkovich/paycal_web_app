import { Component, OnInit } from '@angular/core';
import {EmployeeScheduleEntry} from '../../../STATE/models/employee-schedule-entry.model';
import {CalendarTypes} from '../../../STATE/models/calendar.types';
import {GroupSchedule} from '../../../STATE/models/group-schedule.model';
import {Observable} from 'rxjs';
import {AppState} from '../../../STATE/models/app-state.model';
import {Store} from '@ngrx/store';
import {LoadGroupScheduleMonthsAction, LoadMyMonthScheduleAction} from '../../../STATE/actions/schedule.actions';

@Component({
  selector: 'pcl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  type = CalendarTypes.DAY;
  initialDate = new Date();
  activeMonths$: Observable<GroupSchedule[]>;
  entries$: Observable<EmployeeScheduleEntry[]>;


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.activeMonths$ = this.store.select(state => state.schedule.groupScheduleMonths);
    this.entries$ = this.store.select(state => state.schedule.myMonthSchedule);
    this.store.dispatch(new LoadGroupScheduleMonthsAction());
    this.store.dispatch(new LoadMyMonthScheduleAction({month: this.initialDate.getMonth() + 1, year: this.initialDate.getFullYear()}));
  }

  onShiftClick(entry: EmployeeScheduleEntry) {
    console.log(entry.LaborCode);
  }

  onDateChange(date: Date) {
    this.store.dispatch(new LoadMyMonthScheduleAction({month: date.getMonth() + 1, year: date.getFullYear()}));
  }

}
