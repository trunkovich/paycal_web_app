import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AppState, homeSelectors, profileSelectors} from '../../../STATE/reducers/index';
import {QualifiedEmployee, Employee} from '../../../STATE/models/employee.model';
import {EmployeeScheduleEntry} from '../../../STATE/models/employee-schedule-entry.model';
import {getSMSMessage} from '../../../../environments/environment';
import {
  RemoveUnselectedShiftEmployeesAction,
  CleanShiftEmployeesAction,
  ToggleSelectionAction,
  CreateCoverageRequestAction
} from '../../../STATE/actions/home.actions';
import {TrackMessageGeatureOpenedAction} from '../../../STATE/actions/mixpanel.actions';


@Component({
  selector: 'pcl-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  selectedEmployees$: Observable<QualifiedEmployee[]>;
  profile$: Observable<Employee>;
  private sub: Subscription;
  private scheduleEntry$: Observable<EmployeeScheduleEntry>;

  constructor(private store: Store<AppState>, private _location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      if (params['employeeScheduleEntryID']) {
        this.store.dispatch(new TrackMessageGeatureOpenedAction(params['employeeScheduleEntryID']));
        this.scheduleEntry$ = this.store.select(homeSelectors.getHomeScheduleEntryById(+params['employeeScheduleEntryID']));
      }
    });

    this.store.dispatch(new RemoveUnselectedShiftEmployeesAction());
    this.selectedEmployees$ = this.store.select(homeSelectors.getShiftEmployees);
    this.profile$ = this.store.select(profileSelectors.getMyProfile);
  }

  ngOnDestroy() {
    this.store.dispatch(new CleanShiftEmployeesAction());
  }

  remove(physician: QualifiedEmployee) {
    this.store.dispatch(new ToggleSelectionAction(physician));
    this.store.dispatch(new RemoveUnselectedShiftEmployeesAction());
  }

  send() {
    this.profile$
      .withLatestFrom(this.scheduleEntry$, this.selectedEmployees$)
      .take(1)
      .subscribe(([profile, scheduleEntry, selectedEmployees]) => {
        if (profile && scheduleEntry && selectedEmployees && selectedEmployees.length) {
          this.store.dispatch(new CreateCoverageRequestAction({
            employeeScheduleEntryID: scheduleEntry.EmployeeScheduleEntryID,
            message: getSMSMessage(profile, scheduleEntry),
            delimitedIDs: selectedEmployees.map(employee => employee.employee.EmployeeID)
          }));
        }
      });
  }

  back() {
    this._location.back();
  }

  formattedMessage(profile, scheduleEntry) {
    return getSMSMessage(profile, scheduleEntry);
  }
}
