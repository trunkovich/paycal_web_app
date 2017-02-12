import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';

import {AppState, scheduleSelectors} from '../../../../STATE/reducers/index';
import {ALLOWED_SEARCH_TYPES} from '../../../../STATE/reducers/schedule.reducer';
import {SetSearchType, LoadSearchReferenceAction} from '../../../../STATE/actions/schedule.actions';
import {SEARCH_ROUTES} from '../search.routes';
import {Employee} from '../../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  sub: Subscription;
  loading$: Observable<boolean>;
  type: string;
  id: string;
  title$: Observable<string>;
  employee$: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loading$ = this.store.select(scheduleSelectors.getScheduleLoadingState);
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
    // this.store.dispatch(new SetSearchEntryIdAction(id));
    switch (this.type) {
      case 'physicians': {
        this.employee$ = this.store.select(scheduleSelectors.getEmployeeById(+id));
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

  back() {
    this.router.navigate(['/', SEARCH_ROUTES.SEARCH]);
  }
}
