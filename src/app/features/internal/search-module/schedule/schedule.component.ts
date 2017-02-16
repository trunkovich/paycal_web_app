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
  SetSearchViewTypeAction, SetSearchSelectedDateAction, LoadSearchFullScheduleAction, CleanSearchMonthsScheduleAction,
  SetSearchLoadingAction
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
  activeMonths: GroupSchedule[];
  viewType$: Observable<CalendarTypes>;
  selectedDate$: Observable<Date>;
  entries$: Observable<EmployeeScheduleEntry[] | MasterCalendarEntry[]>;
  groupedEntries$: Observable<EmployeeScheduleEntryGroupedByDay[]>;
  loading$: Observable<boolean>;
  type: string;
  id: string;
  sub: Subscription;
  sub2: Subscription;
  title$: Observable<string>;
  employee$: Observable<Employee>;
  defaultEntries = [{LaborCode: 'OUT', ShiftCode: 'AM'}, {LaborCode: 'OUT', ShiftCode: 'AM'}];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loading$ = this.store.select(searchSelectors.getScheduleLoadingState);
    this.store.dispatch(new SetSearchLoadingAction(true));
    this.store.dispatch(new SetCurrentSectionAction('search'));
    this.store.dispatch(new SetSearchViewTypeAction(CalendarTypes.DAY));
    this.store.dispatch(new CleanSearchMonthsScheduleAction());
    this.viewType$ = this.store.select(searchSelectors.getViewType);
    this.selectedDate$ = this.store.select(searchSelectors.getSelectedDate);
    this.sub = this.store.select(scheduleSelectors.getScheduleMonths)
      .filter((months) => months && !!months.length)
      .subscribe((months) => {
        this.activeMonths = months;

        setTimeout(() => {
          this.parseParams(this.route.snapshot.params);
        });
      });
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
    this.store.dispatch(new LoadSearchFullScheduleAction({type, id}));
    this.store.dispatch(new LoadSearchReferenceAction());
    this.entries$ = this.store.select(searchSelectors.getSortedSelectedDateSchedule);
    this.groupedEntries$ = this.store.select(searchSelectors.getSelectedDateScheduleGroupedByDay);
    switch (this.type) {
      case 'physicians': {
        this.employee$ = this.store.select(searchSelectors.getEmployeeFromGroupById(+id));
        this.title$ = this.employee$.map((employee: Employee) => {
          if (employee) {
            return this.formattedTitle(employee);
          } else {
            return '';
          }
        });
        break;
      }
      default: {
        this.title$ = Observable.of(id);
        break;
      }
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
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

  private formattedTitle(profile: Employee): string {
    if (!profile) {
      return '';
    }
    if (profile.EmployeePositionID === 2) {
      return `Dr. ${profile.FirstName} ${profile.LastName}, MD.`;
    }
    return `${profile.FirstName} ${profile.LastName}`;
  }
}
