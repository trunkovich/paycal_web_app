import * as _ from 'lodash';
import * as moment from 'moment';

import * as requestModels from '../../../STATE/models/create-schedule.model';

export interface WeekEntry {
  days: DayEntry[];
}

export interface DayEntry {
  date: number | null;
  blank: boolean;
  disabled: boolean;
}

export type VacationDays = moment.Moment[];

export class RequestCalendar {
  month: number;
  year: number;
  vacationDays: VacationDays;
  weeks: WeekEntry[];

  constructor(request: requestModels.CreateScheduleDetailsModel) {
    this.month = request.ScheduleRequest.ScheduleMonth - 1;
    this.year = request.ScheduleRequest.ScheduleYear;
    this.weeks = this.fillWeeks(request);

    this.vacationDays = _.map(
      request.VacationWindowList,
      (vacation: requestModels.VacationWindowModel) => moment(vacation.StartDate)
    );
  }

  fillWeeks(request: requestModels.CreateScheduleDetailsModel) {
    let weeks = [{days: []}];
    let month = request.ScheduleRequest.ScheduleMonth - 1;
    let year = request.ScheduleRequest.ScheduleYear;
    let currentDay = moment({year, month}).startOf('week');
    let endDay = moment({year, month}).endOf('month').endOf('week');
    while (!currentDay.isSame(endDay, 'day')) {
      let otherMonth = currentDay.month() !== month;
      weeks[weeks.length - 1].days.push({
        date: otherMonth ? null : currentDay.date(),
        blank: otherMonth,
        disabled: false
      });
      currentDay.add(1, 'day');
      if (weeks[weeks.length - 1].days.length > 6) {
        weeks.push({days: []});
      }
    }
    return weeks;
  }
}
