import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { CallNights, RequestCalendar } from '../schedule-request-calendar.class';

@Component({
  selector: 'pcl-schedule-step-4',
  templateUrl: './schedule-step-4.component.html',
  styleUrls: ['./schedule-step-4.component.scss']
})
export class ScheduleStep4Component {
  @Input() callNights: CallNights | null;
  @Input() calendar: RequestCalendar;
  @Output() onUpdate = new EventEmitter<CallNights>();
  @Output() skipStep = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  constructor() { }

  onDateChange(newDay: moment.Moment, key: number) {
    let nights = _.cloneDeep(this.callNights);
    nights[key] = moment(newDay);
    this.onUpdate.emit(nights);
  }

  submit() {
    this.onSubmit.emit();
  }

  skip() {
    this.skipStep.emit();
  }

}
