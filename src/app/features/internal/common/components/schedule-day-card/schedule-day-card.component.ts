import {Component, Input} from '@angular/core';

import { EmployeeScheduleEntryGroupedByDay } from '../../../../../STATE/models/employee-schedule-entry.model';

@Component({
  selector: 'pcl-schedule-day-card',
  templateUrl: './schedule-day-card.component.html',
  styleUrls: ['./schedule-day-card.component.scss']
})
export class ScheduleDayCardComponent {
  @Input() day: EmployeeScheduleEntryGroupedByDay;
}
