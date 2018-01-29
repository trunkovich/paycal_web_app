import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { AppState, scheduleSelectors, searchSelectors } from '../../../../STATE/reducers/index';
import { ALLOWED_SEARCH_TYPES } from '../../../../STATE/reducers/schedule.reducer';
import { Employee } from '../../../../STATE/models/employee.model';
import {
  CleanSearchMonthsScheduleAction,
  LoadSearchFullScheduleAction,
  LoadSearchReferenceAction,
  SetSearchEntryIdAction,
  SetSearchLoadingAction,
  SetSearchSelectedDateAction,
  SetSearchType,
  SetSearchViewTypeAction
} from '../../../../STATE/actions/search.actions';
import { GroupSchedule } from '../../../../STATE/models/group-schedule.model';
import { CalendarTypes } from '../../../../STATE/models/calendar.types';
import { SetCurrentSectionAction } from '../../../../STATE/actions/schedule.actions';
import { EmployeeScheduleEntry, EmployeeScheduleEntryGroupedByDay } from '../../../../STATE/models/employee-schedule-entry.model';
import { MasterCalendarEntry } from '../../../../STATE/models/master-calendar-entry.model';
import { BottomSheetService } from '../../../../bottom-sheet/bottom-sheet.service';
import { ContactPersonBottomSheetComponent } from '../../contact-person-bottom-sheet/contact-person-bottom-sheet.component';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'pcl-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  entries: (EmployeeScheduleEntry | MasterCalendarEntry)[];
  groupedEntries: EmployeeScheduleEntryGroupedByDay[];
  activeMonths: GroupSchedule[];
  viewType$: Observable<CalendarTypes>;
  selectedDate$: Observable<Date>;
  loading$: Observable<boolean>;
  type: string;
  id: string;
  subs: Subscription[] = [];
  title$: Observable<string>;
  defaultEntries = [{LaborCode: 'OUT', ShiftCode: 'AM'}, {LaborCode: 'OUT', ShiftCode: 'AM'}];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private bss: BottomSheetService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.select(searchSelectors.getScheduleLoadingState);
    this.store.dispatch(new SetSearchLoadingAction(true));
    this.store.dispatch(new SetCurrentSectionAction('search'));
    this.store.dispatch(new SetSearchViewTypeAction(CalendarTypes.DAY));
    this.store.dispatch(new CleanSearchMonthsScheduleAction());
    this.viewType$ = this.store.select(searchSelectors.getViewType);
    this.selectedDate$ = this.store.select(searchSelectors.getSelectedDate);
    this.subs.push(
      this.store.select(scheduleSelectors.getScheduleMonths)
        .pipe(
          filter((months: GroupSchedule[]) => months && !!months.length)
        )
        .subscribe((months) => {
          this.activeMonths = months;
          setTimeout(() => {
            this.parseParams(this.route.snapshot.params);
          });
        })
    );
  }

  private parseParams(params) {
    if (_.includes(ALLOWED_SEARCH_TYPES, params['type']) && params['id']) {
      this.init(params['type'], params['id']);
    } else {
      this.router.navigate(['/', 'search']);
    }
  }

  private init(type: string, id: string) {
    this.type = type;
    this.id = id;
    this.store.dispatch(new SetSearchType(type));
    this.store.dispatch(new SetSearchEntryIdAction(id));
    this.store.dispatch(new LoadSearchFullScheduleAction({type, id}));
    this.store.dispatch(new LoadSearchReferenceAction());
    this.subs.push(
      this.store.select(searchSelectors.getSortedSelectedDateSchedule)
        .subscribe((entries) => {
          this.entries = entries;
        })
    );
    this.subs.push(
      this.store.select(searchSelectors.getSelectedDateScheduleGroupedByDay)
        .subscribe((groupedEntries) => {
          this.groupedEntries = groupedEntries;
        })
    );
    if (this.type === 'physicians') {
      let employee$ = this.store.select(searchSelectors.getEmployeeFromGroupById(+id));
      this.title$ = employee$
        .pipe(
          map((employee: Employee) => this.formattedTitle(employee))
        );
    } else {
      this.title$ = Observable.of(id);
    }
  }

  ngOnDestroy() {
    _.each(this.subs, (sub: Subscription) => sub.unsubscribe());
  }

  onDateChange(date: Date) {
    this.store.dispatch(new SetSearchSelectedDateAction(date));
  }

  back() {
    if (this.type === 'physicians') {
      this.router.navigate(['profile'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
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

  openContactPersonDialog(entry: MasterCalendarEntry) {
    this.bss.open(ContactPersonBottomSheetComponent, {
      schedulePersonId: entry.SchedulePersonID
    });
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
