import { Pipe, PipeTransform } from '@angular/core';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';

import {AppState, searchSelectors} from '../../../../STATE/reducers/index';
import {Employee} from '../../../../STATE/models/employee.model';
import {LoadEmployeesInGroupAction} from '../../../../STATE/actions/search.actions';

@Pipe({
  name: 'physician'
})
export class PhysicianPipe implements PipeTransform {
  physicians: Employee[];

  constructor(private store: Store<AppState>) {
    store.dispatch(new LoadEmployeesInGroupAction());
    store.select(searchSelectors.getEmployeesInGroupList)
      .subscribe((employees: Employee[]) => {
        this.physicians = employees;
      });
  }

  transform(value: number, args?: any): string {
    if (!this.physicians || !this.physicians.length) {
      return value.toString();
    }
    let physician: Employee = _.find(this.physicians, (employee) => employee.ScheduledPersonID === value);
    if (physician) {
      return (physician.LastName || '') + ', ' + (physician.FirstName || '');
    }
    return value.toString();
  }
}
