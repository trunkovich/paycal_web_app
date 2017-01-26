import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppState, scheduleSelectors, profileSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {
  CleanShiftEmployeesAction, RemoveUnselectedShiftEmployeesAction,
  ToggleSelectionAction
} from '../../../STATE/actions/schedule.actions';
import {QualifiedEmployee, Employee} from '../../../STATE/models/employee.model';
import {Observable, Subscription} from 'rxjs';
import {EmployeeScheduleEntry} from '../../../STATE/models/employee-schedule-entry.model';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';


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

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

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
    console.log('send');
  }

  formattedMessage(profile: Employee, scheduleEntry: EmployeeScheduleEntry): string {
    if (!profile || !scheduleEntry) {
      return '';
    }
    let m = moment({year: scheduleEntry.Year, month: scheduleEntry.Month, day: scheduleEntry.Day})
    return `Good Morning, 

I’m looking for my ${scheduleEntry.LaborCode} ${scheduleEntry.ShiftCode} Shift coverage on ${m.format('dddd, MMMM D, YYYY')}.` +
`If you are interested please contact me with the information below.
 
${profile.MobilePhone}
${profile.Email}`;
  }

}
