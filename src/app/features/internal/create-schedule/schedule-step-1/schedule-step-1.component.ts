import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { RequestCalendar, VacationDay, VacationDays } from '../schedule-request-calendar.class';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'pcl-schedule-step-1',
  templateUrl: './schedule-step-1.component.html',
  styleUrls: ['./schedule-step-1.component.scss']
})
export class ScheduleStep1Component {
  @Input() vacationDays: VacationDays | null;
  @Input() calendar: RequestCalendar;
  @Output() onVacationDaysUpdate = new EventEmitter<VacationDay[]>();
  @Output() skipStep = new EventEmitter();
  @Output() addBlankVacationDay = new EventEmitter();
  @Output() onSubmitVacationDays = new EventEmitter();

  constructor() { }

  onDateChange(vacationDay: VacationDay, listIndex: number) {
    if (!this.vacationDays || !this.vacationDays.length) {
      this.onVacationDaysUpdate.emit([vacationDay]);
    } else {
      this.onVacationDaysUpdate.emit(_.map(this.vacationDays, (vDay, index) => {
        if (index === listIndex) {
          return vacationDay;
        }
        return vacationDay;
      }));
    }
  }

  onVacationTypeChange($event: MatRadioChange, start: moment.Moment, end: moment.Moment | null, listIndex: number) {
    this.onDateChange({
      type: $event.value,
      start: moment(start),
      end: end ? moment(end) : null
    }, listIndex);
  }

  onStartDateChange(start: moment.Moment, type: number, end: moment.Moment | null, listIndex: number) {
    this.onDateChange({
      type,
      start: moment(start),
      end: end ? moment(end) : null
    }, listIndex);
  }

  onEndDateChange(end: moment.Moment, type: number, start: moment.Moment | null, listIndex: number) {
    this.onDateChange({
      type,
      start: start ? moment(start) : null,
      end: end ? moment(end) : null
    }, listIndex);
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
