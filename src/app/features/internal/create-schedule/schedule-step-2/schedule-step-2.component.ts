import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { CallUnavailabilityDays, RequestCalendar } from '../schedule-request-calendar.class';
import { CallUnavailabilityType } from '../../../../STATE/models/call-unavailability-type.model';
import { MdSelectChange } from '@angular/material';

@Component({
  selector: 'pcl-schedule-step-2',
  templateUrl: './schedule-step-2.component.html',
  styleUrls: ['./schedule-step-2.component.scss']
})
export class ScheduleStep2Component {
  @Input() callUnavailabilityDays: CallUnavailabilityDays | null;
  @Input() calendar: RequestCalendar;
  @Input() callUnavailabilityTypes: CallUnavailabilityType[];
  @Output() onCallUnavailabilityDaysUpdate = new EventEmitter<CallUnavailabilityDays>();
  @Output() skipStep = new EventEmitter();
  @Output() addBlankCallUnavailabilityDay = new EventEmitter();
  @Output() onSubmitCallUnavailabilityDays = new EventEmitter();

  constructor() { }

  onDateChange(newDay: number, listIndex: number, type: number) {
    if (!this.callUnavailabilityDays || !this.callUnavailabilityDays.length) {
      this.onCallUnavailabilityDaysUpdate.emit([
        {
          date: newDay ? moment({year: this.calendar.year, month: this.calendar.month, date: newDay}) : null,
          type: type
        }
      ]);
    } else {
      this.onCallUnavailabilityDaysUpdate.emit(_.map(this.callUnavailabilityDays, (day, index) => {
        if (index === listIndex) {
          return {
            date: newDay ? moment({ year: this.calendar.year, month: this.calendar.month, date: newDay }) : null,
            type: type
          };
        }
        return day;
      }));
    }
  }

  skip() {
    this.skipStep.emit();
  }

  onAddBlankCallUnavailabilityDayClick() {
    this.addBlankCallUnavailabilityDay.emit();
  }

  submit() {
    this.onSubmitCallUnavailabilityDays.emit();
  }

  onTypeChange(day, index, $event: MdSelectChange) {
    this.onDateChange(day.date ? day.date.date() : null, index, $event.value);
  }

}
