import * as moment from 'moment';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogCalendarComponent } from './dialog-calendar/dialog-calendar.component';
import { RequestCalendar } from '../../../create-schedule/schedule-request-calendar.class';
import { WindowWrapper } from '../../../../../STATE/utils';

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
  @Input() until: moment.Moment | null;
  @Input() from: moment.Moment | null;
  @Output() onDateChange = new EventEmitter<moment.Moment>();

  weekModeValue: string;
  active = false;

  constructor(private dialog: MatDialog, private window: WindowWrapper) {}

  openCalendar($event) {
    const dialogHeight = 250;
    let elem = $event.target;
    while (!elem.classList.contains('date-selector-container')) {
      elem = elem.parentElement;
    }
    let box = elem.getBoundingClientRect();
    let top = box.top + box.height;
    if (top + dialogHeight > this.window.innerHeight) {
      top = this.window.innerHeight - dialogHeight - 64;
    }
    this.active = true;
    let dialogConfig: MatDialogConfig = {
      width: box.width + 'px',
      position: {
        top: top + 'px',
        left: box.left + 'px'
      },
      data: {
        days: this.calendar.days,
        header: moment({year: this.calendar.year, month: this.calendar.month}).format('MMMM YYYY'),
        selectedDay: this.date ? this.date : null,
        weekMode: this.weekMode,
        until: this.until,
        from: this.from
      },
      panelClass: 'dialog-calendar'
    };
    if (box.width < 290) {
      dialogConfig.width = '290px';
      dialogConfig.maxWidth = '290px';
      const left = box.left - ((290 - box.width) / 2);
      dialogConfig.position.left = left + 'px';
    }
    let dialogRef = this.dialog.open(DialogCalendarComponent, dialogConfig);
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
