import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppState, scheduleSelectors} from '../../../STATE/reducers/index';
import {Store} from '@ngrx/store';
import {CleanShiftEmployeesAction, RemoveUnselectedShiftEmployeesAction} from '../../../STATE/actions/schedule.actions';
import {QualifiedEmployee} from '../../../STATE/models/employee.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'pcl-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  selectedEmployees$: Observable<QualifiedEmployee[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new RemoveUnselectedShiftEmployeesAction());
    this.selectedEmployees$ = this.store.select(scheduleSelectors.getShiftEmployees);
  }

  ngOnDestroy() {
    this.store.dispatch(new CleanShiftEmployeesAction());
  }

}
