import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { EducationLeaves, RequestCalendar } from '../schedule-request-calendar.class';


@Component({
  selector: 'pcl-schedule-step-3',
  templateUrl: './schedule-step-3.component.html',
  styleUrls: ['./schedule-step-3.component.scss']
})
export class ScheduleStep3Component {
  @Input() educationLeaves: EducationLeaves | null;
  @Input() calendar: RequestCalendar;
  @Output() onEducationLeavesUpdate = new EventEmitter<EducationLeaves>();
  @Output() skipStep = new EventEmitter();
  @Output() addBlankEducationLeave = new EventEmitter();
  @Output() onSubmitEducationLeaves = new EventEmitter();

  constructor() { }

  onDateChange(newDay: moment.Moment, listIndex: number, name: string, description: string) {
    if (!this.educationLeaves || !this.educationLeaves.length) {
      this.onEducationLeavesUpdate.emit([{
        date: newDay ? moment(newDay) : null,
        name: name,
        description: description
      }]);
    } else {
      this.onEducationLeavesUpdate.emit(_.map(this.educationLeaves, (day, index) => {
        if (index === listIndex) {
          return {
            date: newDay ? moment(newDay) : null,
            name: name,
            description: description
          };
        }
        return day;
      }));
    }
  }

  skip() {
    this.skipStep.emit();
  }

  onAddBlankEntry() {
    this.addBlankEducationLeave.emit();
  }

  submit() {
    this.onSubmitEducationLeaves.emit();
  }

  onNameChange(el, index, $event) {
    this.onDateChange(el.date ? el.date.date() : null, index, $event.target.value, el.description);
  }

  onDescriptionChange(el, index, $event) {
    this.onDateChange(el.date ? el.date.date() : null, index, el.name, $event.target.value);
  }

}
