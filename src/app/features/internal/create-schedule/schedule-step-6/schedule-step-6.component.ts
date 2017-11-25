import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { HospitalistRoundings, RequestCalendar } from '../schedule-request-calendar.class';

@Component({
  selector: 'pcl-schedule-step-6',
  templateUrl: './schedule-step-6.component.html',
  styleUrls: ['./schedule-step-6.component.scss']
})
export class ScheduleStep6Component {
  @Input() hospitalistRoundings: HospitalistRoundings | null;
  @Input() calendar: RequestCalendar;
  @Output() onUpdate = new EventEmitter<moment.Moment[]>();
  @Output() skipStep = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  constructor() { }

  onDateChange(newDay: number, listIndex: number) {
    let roundings = _.cloneDeep(this.hospitalistRoundings);
    roundings[listIndex] = moment({year: this.calendar.year, month: this.calendar.month, date: newDay}).startOf('week');
    this.onUpdate.emit(roundings);
  }

  skip() {
    this.skipStep.emit();
  }

  submit() {
    this.onSubmit.emit();
  }

}
