import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import * as moment from 'moment';

import {AppState, searchSelectors, scheduleSelectors} from '../../../../STATE/reducers/index';
import {ALLOWED_SEARCH_TYPES} from '../../../../STATE/reducers/schedule.reducer';
import {SEARCH_ROUTES} from '../search.routes';
import {Employee} from '../../../../STATE/models/employee.model';
import {
  SetSearchType, LoadSearchReferenceAction, SetSearchEntryIdAction,
  SetSearchViewTypeAction, SetSearchSelectedDateAction, LoadSearchFullScheduleAction, CleanSearchMonthsScheduleAction
} from '../../../../STATE/actions/search.actions';
import {GroupSchedule} from '../../../../STATE/models/group-schedule.model';
import {CalendarTypes} from '../../../../STATE/models/calendar.types';
import {SetCurrentSectionAction, LoadGroupScheduleMonthsAction} from '../../../../STATE/actions/schedule.actions';
import {EmployeeScheduleEntry, EmployeeScheduleEntryGroupedByDay} from '../../../../STATE/models/employee-schedule-entry.model';
import {MasterCalendarEntry} from '../../../../STATE/models/master-calendar-entry.model';

@Component({
  selector: 'pcl-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  activeMonths$: Observable<GroupSchedule[]>;
  viewType$: Observable<CalendarTypes>;
  selectedDate$: Observable<Date>;
  entries$: Observable<EmployeeScheduleEntry[] | MasterCalendarEntry[]>;
  groupedEntries$: Observable<EmployeeScheduleEntryGroupedByDay[]>;
  loading$: Observable<boolean>;
  type: string;
  id: string;
  sub: Subscription;
  title$: Observable<string>;
  employee$: Observable<Employee>;
  defaultEntries = [{LaborCode: 'OUT', ShiftCode: 'AM'}, {LaborCode: 'OUT', ShiftCode: 'AM'}];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new SetCurrentSectionAction('search'));
    this.store.dispatch(new SetSearchViewTypeAction(CalendarTypes.DAY));
    this.store.dispatch(new CleanSearchMonthsScheduleAction());
    this.store.dispatch(new LoadGroupScheduleMonthsAction());
    this.viewType$ = this.store.select(searchSelectors.getViewType);
    this.activeMonths$ = this.store.select(scheduleSelectors.getScheduleMonths);
    this.selectedDate$ = this.store.select(searchSelectors.getSelectedDate);
    this.loading$ = this.store.select(searchSelectors.getLoadingState);
    this.sub = this.route.params.subscribe(params => this.parseParams(params));
  }

  private parseParams(params) {
    if (_.includes(ALLOWED_SEARCH_TYPES, params['type']) && params['id']) {
      this.init(params['type'], params['id']);
    } else {
      this.router.navigate(['/', SEARCH_ROUTES.SEARCH]);
    }
  }

  private init(type: string, id: string) {
    this.type = type;
    this.id = id;
    this.store.dispatch(new SetSearchType(type));
    this.store.dispatch(new SetSearchEntryIdAction(id));
    this.store.dispatch(new LoadSearchFullScheduleAction({type: this.type, id: id}));
    this.entries$ = this.store.select(searchSelectors.getSortedSelectedDateSchedule);
    this.groupedEntries$ = this.store.select(searchSelectors.getSelectedDateScheduleGroupedByDay);
    switch (this.type) {
      case 'physicians': {
        this.employee$ = this.store.select(searchSelectors.getEmployeeFromGroupById(+id));
        this.title$ = this.employee$.map((employee: Employee) => {
          if (employee) {
            return (employee.FirstName || '') + ' ' + (employee.LastName || '');
          } else {
            return '';
          }
        });
        break;
      }
      case 'call-reference': {
        this.title$ = Observable.of(id);
        break;
      }
      case 'or-reference': {
        this.title$ = Observable.of(id);
        break;
      }
    }
    if (this.type !== 'physicians') {
    }
    this.store.dispatch(new LoadSearchReferenceAction());
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onDateChange(date: Date) {
    this.store.dispatch(new SetSearchSelectedDateAction(date));
  }

  back() {
    this.router.navigate(['/', SEARCH_ROUTES.SEARCH]);
  }

  isNotDayView(viewType) {
    return viewType === CalendarTypes.WEEK || viewType === CalendarTypes.TWO_WEEK;
  }

  isDayView(viewType) {
    return viewType === CalendarTypes.DAY;
  }

  onDayClick(day: EmployeeScheduleEntryGroupedByDay) {
    this.store.dispatch(new SetSearchSelectedDateAction(day.date.toDate()));
    this.store.dispatch(new SetSearchViewTypeAction(CalendarTypes.DAY));
  }
}
