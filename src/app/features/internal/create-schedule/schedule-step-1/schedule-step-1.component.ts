import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { RequestCalendar, VacationDays } from '../schedule-request-calendar.class';

@Component({
  selector: 'pcl-schedule-step-1',
  templateUrl: './schedule-step-1.component.html',
  styleUrls: ['./schedule-step-1.component.scss']
})
export class ScheduleStep1Component {
  @Input() vacationDays: VacationDays | null;
  @Input() calendar: RequestCalendar;
  @Output() onVacationDaysUpdate = new EventEmitter<moment.Moment[]>();

  constructor() { }

  onDateChange(newDay: number, listIndex: number) {
    this.onVacationDaysUpdate.emit(_.map(this.vacationDays, (vacationDay, index) => {
      if (index === listIndex) {
        return moment({year: this.calendar.year, month: this.calendar.month, date: newDay});
      }
      return vacationDay;
    }));
  }

}
