import * as moment from 'moment';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'pcl-custom-date-selector',
  templateUrl: './custom-date-selector.component.html',
  styleUrls: ['./custom-date-selector.component.scss']
})
export class CustomDateSelectorComponent implements OnChanges {
  @Input() date: moment.Moment;
  @Input() placeholder = 'Select a Date';
  @Output() onDateChange = new EventEmitter<number>();

  ngOnChanges(changes) {

  }

  openCalendar() {
    console.log('open calendar');
  }

}
