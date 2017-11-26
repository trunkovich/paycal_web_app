import * as moment from 'moment';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DialogCalendarComponent } from './dialog-calendar/dialog-calendar.component';
import { RequestCalendar } from '../../../create-schedule/schedule-request-calendar.class';

@Component({
  selector: 'pcl-custom-date-selector',
  templateUrl: './custom-date-selector.component.html',
  styleUrls: ['./custom-date-selector.component.scss']
})
export class CustomDateSelectorComponent implements OnChanges {
  @Input() date: moment.Moment;
  @Input() placeholder = 'Select a Date';
  @Input() calendar: RequestCalendar;
  @Input() weekMode: boolean;
  @Output() onDateChange = new EventEmitter<moment.Moment>();

  weekModeValue: string;

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
        selectedDay: this.date ? this.date : null,
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

  ngOnChanges() {
    if (this.weekMode && this.date) {
      let from = moment(this.date);
      let to = moment(from).endOf('week');
      let str = `from ${from.format('MMM. Do')} to `;
      if (from.isSame(to, 'month')) {
        str += to.format('Do');
      } else {
        str += to.format('MMM. Do');
      }
      this.weekModeValue = str;
    }
  }

}
