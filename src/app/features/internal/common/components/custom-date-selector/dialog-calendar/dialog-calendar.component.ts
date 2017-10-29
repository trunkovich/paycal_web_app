import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { DayEntry } from '../../../../create-schedule/schedule-request-calendar.class';

@Component({
  selector: 'pcl-dialog-calendar',
  templateUrl: './dialog-calendar.component.html',
  styleUrls: ['./dialog-calendar.component.scss']
})
export class DialogCalendarComponent {
  days: DayEntry[];
  header: string;
  selectedDay: number;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.days = data.days;
    this.header = data.header;
    this.selectedDay = data.selectedDay;
  }

  onDayClick(day) {
    console.log(day);
  }

}
