import * as moment from 'moment';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DialogCalendarComponent } from './dialog-calendar/dialog-calendar.component';
import { RequestCalendar } from '../../../create-schedule/schedule-request-calendar.class';

@Component({
  selector: 'pcl-custom-date-selector',
  templateUrl: './custom-date-selector.component.html',
  styleUrls: ['./custom-date-selector.component.scss']
})
export class CustomDateSelectorComponent {
  @Input() date: moment.Moment;
  @Input() placeholder = 'Select a Date';
  @Input() calendar: RequestCalendar;
  @Input() weekMode: boolean;
  @Output() onDateChange = new EventEmitter<number>();

  active = false;

  constructor(private dialog: MdDialog) {}

  openCalendar($event) {
    let elem = $event.target;
    while (!elem.classList.contains('date-selector-container')) {
      elem = elem.parentElement;
    }
    let box = elem.getBoundingClientRect();
    this.active = true;
    let dialogRef = this.dialog.open(DialogCalendarComponent, {
      width: box.width + 'px',
      position: {
        top: box.top + box.height + 'px',
        left: box.left + 'px'
      },
      data: {
        days: this.calendar.days,
        header: moment({year: this.calendar.year, month: this.calendar.month}).format('MMMM YYYY'),
        selectedDay: this.date ? this.date.date() : null,
        weekMode: this.weekMode
      },
      panelClass: 'dialog-calendar'
    });
    dialogRef.beforeClose().subscribe(result => {
      this.active = false;
      if (result) {
        this.onDateChange.emit(result.date);
      }
    })
  }

}
