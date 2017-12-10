import { Component, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { RequestCalendar } from '../schedule-request-calendar.class';

@Component({
  selector: 'pcl-schedule-step-10',
  templateUrl: './schedule-step-10.component.html',
  styleUrls: ['./schedule-step-10.component.scss']
})
export class ScheduleStep10Component implements OnChanges {
  @Input() calendar: RequestCalendar;

  hospitalRoundings: string[] = [];

  constructor() { }

  ngOnChanges() {
    if (this.calendar && this.calendar.hospitalistRoundings) {
      _.each(this.calendar.hospitalistRoundings,
        (rounding) => {
          if (rounding) {
            let from = moment(rounding);
            let to = moment(from).endOf('week');
            let str = `from ${from.format('MMM. Do')} to `;
            if (from.isSame(to, 'month')) {
              str += to.format('Do');
            } else {
              str += to.format('MMM. Do');
            }
            this.hospitalRoundings.push(str);
          }
        }
      );

    }
  }
}
