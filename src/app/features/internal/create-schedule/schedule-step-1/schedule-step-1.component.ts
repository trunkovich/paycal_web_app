import { Component, Input } from '@angular/core';
import { RequestCalendar, VacationDays } from '../schedule-request-calendar.class';

@Component({
  selector: 'pcl-schedule-step-1',
  templateUrl: './schedule-step-1.component.html',
  styleUrls: ['./schedule-step-1.component.scss']
})
export class ScheduleStep1Component {
  @Input() vacationDays: VacationDays | null;
  @Input() calendar: RequestCalendar;

  constructor() { }

}
