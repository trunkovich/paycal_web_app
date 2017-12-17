import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

import { CreateScheduleModel } from '../../../../STATE/models/create-schedule.model';

@Component({
  selector: 'pcl-month-entry',
  templateUrl: './month-entry.component.html',
  styleUrls: ['./month-entry.component.scss']
})
export class MonthEntryComponent {
  _scheduleRequest: CreateScheduleModel;
  date: moment.Moment;

  @Output() onButtonClick = new EventEmitter();
  @Input() deadlinePassed: boolean;
  @Input('scheduleRequest')
  set scheduleRequest(request: CreateScheduleModel) {
    this._scheduleRequest = request;
    this.date = moment({month: request.ScheduleMonth - 1, year: request.ScheduleYear});
  }
  get scheduleRequest() {
    return this._scheduleRequest;
  }

}
