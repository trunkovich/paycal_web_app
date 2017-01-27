import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {QualifiedEmployee} from '../../../STATE/models/employee.model';
import {AppState, scheduleSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {Subscription, Observable} from 'rxjs';
import {
  LoadShiftEmployeesAction, CleanShiftEmployeesAction,
  ToggleSelectionAction
} from '../../../STATE/actions/schedule.actions';
import {INTERNAL_ROUTES} from '../internal.routes';

@Component({
  selector: 'pcl-qualified-physicians',
  templateUrl: './qualified-physicians.component.html',
  styleUrls: ['./qualified-physicians.component.scss']
})
export class QualifiedPhysiciansComponent implements OnInit, OnDestroy {
  physicians$: Observable<QualifiedEmployee[]>;
  isAnyPhysicianSelected$: Observable<boolean>;
  private cleanQualifiedPhysicians = true;
  private sub: Subscription;
  private employeeScheduleEntryID: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private _location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      if (params['employeeScheduleEntryID']) {
        this.employeeScheduleEntryID = params['employeeScheduleEntryID'];
        this.store.dispatch(new LoadShiftEmployeesAction(+params['employeeScheduleEntryID']));
      }
    });

    this.physicians$ = this.store.select(scheduleSelectors.getSortedShiftEmployees);
    this.isAnyPhysicianSelected$ = this.store.select(scheduleSelectors.isAnyPhysicianSelected);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
    this.router.navigate(['/', INTERNAL_ROUTES.MESSAGE, this.employeeScheduleEntryID]);
  }

}
