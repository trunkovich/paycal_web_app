import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppState, scheduleSelectors, profileSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {
  CleanShiftEmployeesAction, RemoveUnselectedShiftEmployeesAction,
  ToggleSelectionAction, CreateCoverageRequestAction
} from '../../../STATE/actions/schedule.actions';
import {QualifiedEmployee, Employee} from '../../../STATE/models/employee.model';
import {Observable, Subscription} from 'rxjs';
import {EmployeeScheduleEntry} from '../../../STATE/models/employee-schedule-entry.model';
import {ActivatedRoute} from '@angular/router';
import {getSMSMessage} from '../../../../environments/environment';


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
        this.scheduleEntry$ = this.store.select(scheduleSelectors.getScheduleEntryById(+params['employeeScheduleEntryID']));
      }
    });

    this.store.dispatch(new RemoveUnselectedShiftEmployeesAction());
    this.selectedEmployees$ = this.store.select(scheduleSelectors.getShiftEmployees);
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
            // TODO: REMOVE THIS SLICE
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
