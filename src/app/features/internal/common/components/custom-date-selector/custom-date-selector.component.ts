import * as moment from 'moment';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DialogCalendarComponent } from './dialog-calendar/dialog-calendar.component';

@Component({
  selector: 'pcl-custom-date-selector',
  templateUrl: './custom-date-selector.component.html',
  styleUrls: ['./custom-date-selector.component.scss']
})
export class CustomDateSelectorComponent implements OnChanges {
  @Input() date: moment.Moment;
  @Input() placeholder = 'Select a Date';
  @Output() onDateChange = new EventEmitter<number>();

  active = false;

  constructor(private dialog: MdDialog) {}

  ngOnChanges(changes) {

  }

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
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.active = false;
    });
  }

}
