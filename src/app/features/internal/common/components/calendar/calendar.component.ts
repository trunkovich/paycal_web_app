import {
  Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {CalendarTypes} from '../../../../../STATE/models/calendar.types';
import * as moment from 'moment';
import {Calendar} from './calendar.class';
import {GroupSchedule} from '../../../../../STATE/models/group-schedule.model';

@Component({
  selector: 'pcl-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges {
  @Input() type: CalendarTypes;
  @Input() initialDate: Date;
  @Input() activeMonths: GroupSchedule[];
  @Output() onDateChange = new EventEmitter<Date>();

  showCalendar: boolean = false;
  date: moment.Moment;
  calendar: Calendar | null;

  ngOnChanges(changes) {
    this.init();
    if (this.showCalendar) {
      if ('activeMonths' in changes && Array.isArray(changes.activeMonths.currentValue)) {
        this.calendar.setActiveMonths(changes.activeMonths.currentValue);
      }
    }
  }

  isWeekType(): boolean {
    return this.type === CalendarTypes.WEEK;
  }

  isTwoWeekType(): boolean {
    return this.type === CalendarTypes.TWO_WEEK;
  }

  getTypeClass(): string {
    return this.type === CalendarTypes.DAY ? 'day-type' : (this.type === CalendarTypes.WEEK ? 'week-type' : 'two-week-type');
  }

  init() {
    this.date = moment(this.initialDate);
  }

  openCalendar() {
    this.calendar = new Calendar(this.date, this.type, this.activeMonths);
    this.showCalendar = true;
  }

  closeCalendar() {
    this.date = moment(this.calendar.getCurrentDate());
    this.calendar = null;
    this.showCalendar = false;
    this.onDateChange.emit(this.date.toDate());
  }

  onHeaderMonthClick() {
    this.calendar.setMonthView();
  }

  onHeaderYearClick() {
    this.calendar.setYearView();
  }

  onMonthClick(month: moment.Moment) {
    this.calendar.selectMonth(month);
  }

  onYearClick(year: moment.Moment) {
    this.calendar.selectYear(year);
  }

  onDayClick(day: moment.Moment) {
    this.calendar.selectDay(day);
  }

  onPrevClick() {
    this.calendar.previousView();
  }

  onNextClick() {
    this.calendar.nextView();
  }

  get formattedDate(): string {
    let result = '';
    switch (this.type) {
      case CalendarTypes.DAY: {
        result += moment(this.date).format('LL');
        break;
      }
      case CalendarTypes.WEEK:
      case CalendarTypes.TWO_WEEK: {
        let dayDuration = this.type === CalendarTypes.WEEK ? 6 : 13;
        let startDate = moment(this.date);
        let endDate = moment(this.date).add(dayDuration, 'day');
        result += startDate.format('MMMM D');
        if (!startDate.isSame(endDate, 'year')) {
          result += ', ';
          result += startDate.format('YYYY');
        }
        if (!startDate.isSame(endDate, 'month')) {
          result += ' - ';
          result += endDate.format('MMMM ');
        } else {
          result += '-';
        }
        result += endDate.format('D, YYYY');
      }
    }
    return result;
  }

}
