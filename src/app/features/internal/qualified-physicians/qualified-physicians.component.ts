import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {QualifiedEmployee} from '../../../STATE/models/employee.model';
import {AppState, scheduleSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {Subscription, Observable} from 'rxjs';
import {
  LoadShiftEmployeesAction, CleanShiftEmployeesAction,
  ToggleSelectionAction
} from '../../../STATE/actions/schedule.actions';

@Component({
  selector: 'pcl-qualified-physicians',
  templateUrl: './qualified-physicians.component.html',
  styleUrls: ['./qualified-physicians.component.scss']
})
export class QualifiedPhysiciansComponent implements OnInit, OnDestroy {
  physicians$: Observable<QualifiedEmployee[]>;
  isAnyPhysicianSelected$: Observable<boolean>;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private _location: Location) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      if (params['employeeScheduleEntryID']) {
        this.store.dispatch(new LoadShiftEmployeesAction(+params['employeeScheduleEntryID']));
      }
    });

    this.physicians$ = this.store.select(scheduleSelectors.getShiftEmployees);
    this.isAnyPhysicianSelected$ = this.store.select(scheduleSelectors.isAnyPhysicianSelected);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.store.dispatch(new CleanShiftEmployeesAction());
  }

  toggleSelection(physician: QualifiedEmployee) {
    this.store.dispatch(new ToggleSelectionAction(physician));
  }

  back() {
    this._location.back();
  }

  next() {
    console.log('next');
  }

}
