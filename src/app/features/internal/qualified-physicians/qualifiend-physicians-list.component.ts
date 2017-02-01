import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';
import {QualifiedEmployeeGroup, QualifiedEmployee} from '../../../STATE/models/employee.model';

@Component({
  selector: 'pcl-qualifiend-physicians-list',
  templateUrl: './qualifiend-physicians-list.component.html',
  styleUrls: ['./qualifiend-physicians-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QualifiendPhysiciansListComponent {
  @Input() physicianGroups: QualifiedEmployeeGroup[];
  @Output() employeeSelected = new EventEmitter();

  constructor() { }

  toggleSelection(physician: QualifiedEmployee) {
    this.employeeSelected.emit(physician);
  }

}
