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
  @Output() skipStep = new EventEmitter();
  @Output() addBlankVacationDay = new EventEmitter();
  @Output() onSubmitVacationDays = new EventEmitter();

  constructor() { }

  onDateChange(newDay: moment.Moment, listIndex: number) {
    if (!this.vacationDays || !this.vacationDays.length) {
      this.onVacationDaysUpdate.emit([moment(newDay)]);
    } else {
      this.onVacationDaysUpdate.emit(_.map(this.vacationDays, (vacationDay, index) => {
        if (index === listIndex) {
          return moment(newDay);
        }
        return vacationDay;
      }));
    }
  }

  skip() {
    this.skipStep.emit();
  }

  onAddBlankVacationDayClick() {
    this.addBlankVacationDay.emit();
  }

  submitVacationDays() {
    this.onSubmitVacationDays.emit();
  }

}
