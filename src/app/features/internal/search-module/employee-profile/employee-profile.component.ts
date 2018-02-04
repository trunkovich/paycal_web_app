import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { Employee } from '../../../../STATE/models/employee.model';
import { AppState, scheduleSelectors, searchSelectors } from '../../../../STATE/reducers/index';
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
import { Observable } from 'rxjs/Observable';
import { EmployeeScheduleEntryGroupedByDay } from '../../../../STATE/models/employee-schedule-entry.model';
import { CalendarTypes } from '../../../../STATE/models/calendar.types';
import { SetCurrentSectionAction } from '../../../../STATE/actions/schedule.actions';
import { filter, map, switchMap, take, toArray } from 'rxjs/operators';

@Component({
  selector: 'pcl-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit, OnDestroy {
  profile: Employee;
  type = 'physicians';
  entryId: string;
  nextThreeDaysEntries$: Observable<EmployeeScheduleEntryGroupedByDay[]>;
  loading$: Observable<boolean>;

  sub: Subscription;
  sub2: Subscription;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loading$ = this.store.select(searchSelectors.getScheduleLoadingState);

    this.store.dispatch(new SetSearchLoadingAction(true));
    this.store.dispatch(new SetCurrentSectionAction('search'));
    this.store.dispatch(new CleanSearchMonthsScheduleAction());

    this.route.params
      .pipe(
        map(params => params.id)
      )
      .subscribe(id => {
        this.entryId = id;

        this.sub = this.store.select(scheduleSelectors.getScheduleMonths)
          .pipe(
            filter((months) => months && !!months.length)
          )
          .subscribe(() => {
            setTimeout(() => {
              this.store.dispatch(new SetSearchType(this.type));
              this.store.dispatch(new SetSearchViewTypeAction(CalendarTypes.TWO_WEEK));
              this.store.dispatch(new SetSearchEntryIdAction(this.entryId));
              this.store.dispatch(new LoadSearchFullScheduleAction({type: this.type, id: this.entryId}));
              this.store.dispatch(new LoadSearchReferenceAction());
            });
          });

        this.sub2 = this.store.select(searchSelectors.getEmployeeFromGroupById(+this.entryId))
          .subscribe((profile: Employee) => {
            this.profile = profile;
          });
      });


    const today = moment();
    this.nextThreeDaysEntries$ = this.store.select(searchSelectors.getSelectedDateScheduleGroupedByDay)
      .pipe(
        filter(entries => !!entries),
        switchMap(entries => Observable.from(entries)),
        filter(entry => entry.date.isSameOrAfter(today, 'day')),
        take(7),
        toArray()
      );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  back() {
    this.router.navigate(['search', 'physicians']);
  }

  onDayClick(day) {
    this.store.dispatch(new SetSearchSelectedDateAction(day.date.toDate()));
    this.store.dispatch(new SetSearchViewTypeAction(CalendarTypes.DAY));
    this.router.navigate(['search', 'physicians', this.entryId]);
  }

  getPhotoUrl(profile: Employee): string {
    if (!profile || !profile.PhotoUrl) {
      return '';
    } else {
      return `url(${profile.PhotoUrl})`;
    }
  }

  getEmployeeName(profile: Employee): string {
    if (!profile) {
      return '';
    } else {
      return `${profile.FirstName || ''} ${profile.LastName || ''}`;
    }
  }

  goToFullSchedule() {
    this.router.navigate(['search', 'physicians', this.entryId]);
  }
}
