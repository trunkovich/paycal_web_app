import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';

import { DayEntry } from '../../../../create-schedule/schedule-request-calendar.class';

@Component({
  selector: 'pcl-dialog-calendar',
  templateUrl: './dialog-calendar.component.html',
  styleUrls: ['./dialog-calendar.component.scss']
})
export class DialogCalendarComponent {
  days: DayEntry[];
  header: string;
  selectedDay: moment.Moment;
  weekMode: boolean;
  until: moment.Moment | null;
  from: moment.Moment | null;

  constructor(
    public dialogRef: MatDialogRef<DialogCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.days = data.days;
    this.header = data.header;
    this.selectedDay = data.selectedDay;
    this.weekMode = data.weekMode;
    this.from = data.from;
    this.until = data.until;
  }

  isArray(array): boolean {
    return Array.isArray(array);
  }

  onDayClick(day) {
    if (this.weekMode) {
      if (!day.weekSelected) {
        this.dialogRef.close(day);
      }
    } else {
      if (!day.disabled) {
        this.dialogRef.close(day);
      }
    }
  }

}
