import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { QualifiedEmployee, QualifiedEmployeeGroup } from '../../../STATE/models/employee.model';
import { AppState, homeSelectors } from '../../../STATE/reducers/index';
import {
  CleanShiftEmployeesAction,
  LoadShiftEmployeesAction,
  SetEmployeeLoading,
  ToggleSelectionAction
} from '../../../STATE/actions/home.actions';
import { TrackEmployeesRequestedAction } from '../../../STATE/actions/mixpanel.actions';

@Component({
  selector: 'pcl-qualified-physicians',
  templateUrl: './qualified-physicians.component.html',
  styleUrls: ['./qualified-physicians.component.scss']
})
export class QualifiedPhysiciansComponent implements OnInit, OnDestroy {
  physicianGroups$: Observable<QualifiedEmployeeGroup[]>;
  isAnyPhysicianSelected$: Observable<boolean>;
  isPhysiciansLoading$: Observable<boolean>;
  private cleanQualifiedPhysicians = true;
  private sub: Subscription;
  private employeeScheduleEntryID: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private _location: Location,
    private router: Router
  ) {  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      if (params['employeeScheduleEntryID']) {
        this.employeeScheduleEntryID = params['employeeScheduleEntryID'];
        this.store.dispatch(new TrackEmployeesRequestedAction(this.employeeScheduleEntryID));
        this.store.dispatch(new LoadShiftEmployeesAction(+params['employeeScheduleEntryID']));
      }
    });

    this.store.dispatch(new SetEmployeeLoading());
    this.physicianGroups$ = this.store.select(homeSelectors.getHomeGroupedSortedShiftEmployees);
    this.isPhysiciansLoading$ = this.store.select(homeSelectors.getHomeLoadingState);
    this.isAnyPhysicianSelected$ = this.store.select(homeSelectors.isAnyPhysicianSelected);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.cleanQualifiedPhysicians) {
      this.store.dispatch(new CleanShiftEmployeesAction());
    }
  }

  toggleSelection(physician: QualifiedEmployee) {
    this.store.dispatch(new ToggleSelectionAction(physician));
  }

  back() {
    this._location.back();
  }

  next() {
    this.cleanQualifiedPhysicians = false;
    this.router.navigate(['/', 'message', this.employeeScheduleEntryID]);
  }

}
