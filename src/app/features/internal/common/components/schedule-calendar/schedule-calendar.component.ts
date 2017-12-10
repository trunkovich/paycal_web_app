import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

import { DayEntry } from '../../../create-schedule/schedule-request-calendar.class';

@Component({
  selector: 'pcl-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent {
  @Input() days: DayEntry[];
  @Input() header: string;
  @Input() selectedDay: moment.Moment;
  @Input() weekMode: boolean;
  @Input() readOnlyMode: boolean;
  @Output() onDayClick = new EventEmitter<DayEntry>();

  constructor() {}

  isArray(array): boolean {
    return Array.isArray(array);
  }

  dayClick(day) {
    if (this.readOnlyMode) {
      return;
    }
    if (this.weekMode) {
      if (!day.weekSelected) {
        this.onDayClick.emit(day);
      }
    } else {
      if (!day.disabled) {
        this.onDayClick.emit(day);
      }
    }
  }

}
