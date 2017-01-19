/**
 * Created by TrUnK on 19.01.2017.
 */

import * as moment from 'moment';
import {CalendarTypes} from '../../../../../STATE/models/calendar.types';

enum ViewType {
  DAY,
  MONTH,
  YEAR
}

interface ActiveMonth {
  Year: number;
  Month: number;
}

interface CalendarEntry {
  title: string;
  value: moment.Moment;
  disabled: boolean;
}

interface CalendarTypeView {
  value: moment.Moment;
  calendarEntries: CalendarEntry[];
}

export interface CalendarView {
  day: CalendarTypeView[];
  month: CalendarTypeView[];
  year: CalendarTypeView[];
}

export class Calendar {
  private viewType = ViewType.DAY;
  private type: CalendarTypes;
  private activeMonths: ActiveMonth[];
  private currentDate: moment.Moment;

  data: CalendarView;
  viewDate: moment.Moment;

  constructor(date, type, activeMonths: ActiveMonth[]) {
    this.type = type;
    this.viewDate = moment(date);
    this.currentDate = moment(date);
    this.activeMonths = activeMonths;
    this.data = this.generateCalendarView(moment(date));
  }

  getYearsViewDate(): string {
    return moment(this.viewDate).subtract(6, 'year').format('YYYY') + ' - ' + moment(this.viewDate).add(5, 'year').format('YYYY');
  }

  isDayView(): boolean {
    return this.viewType === ViewType.DAY;
  }

  isMonthView(): boolean {
    return this.viewType === ViewType.MONTH;
  }

  isYearView(): boolean {
    return this.viewType === ViewType.YEAR;
  }

  isView(type: string): boolean {
    switch (type) {
      case 'day':
        return this.isDayView();
      case 'month':
        return this.isMonthView();
      case 'year':
        return this.isYearView();
    }
  }

  getCurrentDate(): moment.Moment {
    return this.currentDate;
  }

  setMonthView(): void {
    this.viewType = ViewType.MONTH;
  }

  setYearView(): void {
    this.viewType = ViewType.YEAR;
  }

  selectMonth(month): void {
    this.viewDate = moment(month);
    this.data['day'] = this.generateCalendarTypeViews(ViewType.DAY, moment(this.viewDate));
    setTimeout(() => {
      this.viewType = ViewType.DAY;
      this.data['month'] = this.generateCalendarTypeViews(ViewType.MONTH, moment(this.viewDate));
      this.data['year'] = this.generateCalendarTypeViews(ViewType.YEAR, moment(this.viewDate));
    });
  }

  selectYear(year): void {
    this.viewDate = moment(year);
    this.data['month'] = this.generateCalendarTypeViews(ViewType.MONTH, moment(this.viewDate));
    setTimeout(() => {
      this.viewType = ViewType.MONTH;
      this.data['day'] = this.generateCalendarTypeViews(ViewType.DAY, moment(this.viewDate));
      this.data['year'] = this.generateCalendarTypeViews(ViewType.YEAR, moment(this.viewDate));
    });
  }

  selectDay(day): void {
    this.currentDate = moment(day);
  }

  previousView(): void {
    this.nextOrPrevious(true);
  }

  nextView(): void {
    this.nextOrPrevious();
  }

  private nextOrPrevious(previous = false): void {
    // different directions
    let value = previous ? -1 : 1;
    let removeAction = previous ? 'pop' : 'shift';
    let addAction = previous ? 'unshift' : 'push';
    // different viewTypes
    let view = this.viewType === ViewType.DAY ? 'day' : (this.viewType === ViewType.MONTH ? 'month' : 'year');
    let mul = this.viewType === ViewType.YEAR ? 12 : 1;

    this.viewDate = moment(this.viewDate).add(value * mul, this.viewType === ViewType.DAY ? 'month' : 'year');
    let future = moment(this.viewDate).add(value * mul, this.viewType === ViewType.DAY ? 'month' : 'year');
    this.data[view][removeAction]();
    this.data[view][addAction]({
      value:  moment(future),
      calendarEntries: this.generateCalendarEntries(this.viewType, moment(future))
    });
  }

  private generateCalendarView(date: moment.Moment): CalendarView {
    return {
      day: this.generateCalendarTypeViews(ViewType.DAY, moment(date)),
      month: this.generateCalendarTypeViews(ViewType.MONTH, moment(date)),
      year: this.generateCalendarTypeViews(ViewType.YEAR, moment(date))
    };
  }

  private generateCalendarTypeViews(viewType: ViewType, date: moment.Moment): CalendarTypeView[] {
    let views: CalendarTypeView[] = [];
    let mul = viewType === ViewType.YEAR ? 12 : 1;

    [-1, 0, 1].forEach((i) => {
      views.push({
        value: moment(date).add(i * mul, viewType === ViewType.DAY ? 'month' : 'year'),
        calendarEntries: this.generateCalendarEntries(viewType, moment(date).add(i * mul, viewType === ViewType.DAY ? 'month' : 'year'))
      });
    });

    return views;
  }

  private generateCalendarEntries(viewType: ViewType, date: moment.Moment): CalendarEntry[] {
    let entries: CalendarEntry[] = [];
    switch (viewType) {
      case ViewType.DAY: {
        let end = moment(date).endOf('month');
        let startOfMonth = moment(date).startOf('month');

        let incrementalDate = moment(startOfMonth).startOf('week');

        while (!incrementalDate.isAfter(end)) {
          entries.push({
            title: '' + (incrementalDate.isBefore(startOfMonth) ? '' : incrementalDate.date()),
            value: moment(incrementalDate),
            disabled: incrementalDate.isBefore(startOfMonth)
          });
          incrementalDate.add(1, 'day');
        }
        break;
      }
      case ViewType.MONTH: {
        let m = moment(date).startOf('year');
        for (let i = 1; i <= 12; i++) {
          entries.push({
            title: m.format('MMM'),
            value: moment(m),
            disabled: false
          });
          m.add(1, 'month');
        }
        break;
      }
      case ViewType.YEAR: {
        let m = moment(date).subtract(6, 'year');
        for (let i = 1; i <= 12; i++) {
          entries.push({
            title: m.format('YYYY'),
            value: moment(m),
            disabled: false
          });
          m.add(1, 'year');
        }
        break;
      }
    }
    return entries;
  }
}
