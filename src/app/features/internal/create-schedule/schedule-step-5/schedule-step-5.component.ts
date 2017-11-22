import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestCalendar, Weekend } from '../schedule-request-calendar.class';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'pcl-schedule-step-5',
  templateUrl: './schedule-step-5.component.html',
  styleUrls: ['./schedule-step-5.component.scss']
})
export class ScheduleStep5Component {
  @Output() onUpdate = new EventEmitter<Weekend>();
  @Output() onSubmit = new EventEmitter();

  @Input('weekend')
  set weekend(value: Weekend | null) {
    this.weekendNum = value ? value.num : null;
  }
  @Input('calendar')
  set calendar(value: RequestCalendar | null) {
    if (!this.weekends) {
      this.weekends = value ? value.getWeekends(moment({month: value.month, year: value.year})) : null;
    }
  }

  weekendNum: number;
  weekends: Weekend[] | null;

  constructor() { }

  onWeekendChange($event) {
    this.onUpdate.emit(_.find(this.weekends, weekend => weekend.num === $event.value));
  }
}
