import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

import { RequestCalendar, VolunteerShift } from '../schedule-request-calendar.class';
import { Hospital } from '../../../../STATE/models/hospital.model';
import { ShiftType } from '../../../../STATE/models/shift-type.model';


@Component({
  selector: 'pcl-schedule-step-7',
  templateUrl: './schedule-step-7.component.html',
  styleUrls: ['./schedule-step-7.component.scss']
})
export class ScheduleStep7Component {
  @Input() volunteerShift: VolunteerShift | null;
  @Input() calendar: RequestCalendar;
  @Input() hospitals: Hospital[];
  @Input() shifts: ShiftType[];
  @Output() onUpdate = new EventEmitter<VolunteerShift>();
  @Output() skipStep = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  constructor() { }

  onDateChange(newDay: moment.Moment, hospitalId: number, shiftId: number) {
    this.onUpdate.emit({
      date: moment(newDay),
      hospitalId,
      shiftId
    });
  }

  skip() {
    this.skipStep.emit();
  }

  submit() {
    this.onSubmit.emit();
  }

  onHospitalChange($event) {
    this.onDateChange(
      this.volunteerShift.date ? this.volunteerShift.date : null,
      $event.value,
      this.volunteerShift.shiftId
    );
  }

  onShiftChange($event) {
    this.onDateChange(
      this.volunteerShift.date ? this.volunteerShift.date : null,
      this.volunteerShift.hospitalId,
      $event.value
    );
  }

}
