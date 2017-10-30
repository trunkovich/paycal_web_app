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
  event: string;
}

export type VacationDays = Array<moment.Moment | null>;

export class RequestCalendar {
  month: number;
  year: number;
  vacationDays: VacationDays;
  days: DayEntry[];
  events = {};
  private initialData: requestModels.CreateScheduleDetailsModel;

  constructor(request: requestModels.CreateScheduleDetailsModel) {
    this.initialData = request;
    this.month = request.ScheduleRequest.ScheduleMonth - 1;
    this.year = request.ScheduleRequest.ScheduleYear;

    this.fillVacationDays(request.VacationWindowList);


    this.days = this.fillDays(request);
  }

  fillDays(request: requestModels.CreateScheduleDetailsModel) {
    let days = [];
    let month = request.ScheduleRequest.ScheduleMonth - 1;
    let year = request.ScheduleRequest.ScheduleYear;
    let currentDay = moment({year, month}).startOf('week');
    let endDay = moment({year, month}).endOf('month').endOf('week');
    while (!currentDay.isSame(endDay, 'day')) {
      let otherMonth = currentDay.month() !== month;
      let haveEvent = !!this.events[currentDay.date()];
      days.push({
        date: otherMonth ? null : currentDay.date(),
        blank: otherMonth,
        disabled: haveEvent,
        event: !otherMonth && haveEvent ? this.events[currentDay.date()] : null
      });
      currentDay.add(1, 'day');
    }
    return days;
  }

  fillVacationDays(vacationWindowList: requestModels.VacationWindowModel[]) {
    if (vacationWindowList.length) {
      this.vacationDays = _.map(
        vacationWindowList,
        (vacation: requestModels.VacationWindowModel) => moment(vacation.StartDate)
      );
      _.each(this.vacationDays, (day: moment.Moment) => this.events[day.date()] = '#ffd300');
    } else {
      this.vacationDays = [null];
    }
  }

  setVacationDays(days: moment.Moment[]): RequestCalendar {
    let newData = _.cloneDeep<requestModels.CreateScheduleDetailsModel>(this.initialData);
    newData.VacationWindowList = _.map(days, day => {
      return {
        StartDate: day.toISOString(),
        EndDate: day.toISOString(),
        ScheduleRequestID: this.initialData.ScheduleRequest.ScheduleRequestID,
        EmployeeID: this.initialData.ScheduleRequest.EmployeeID,
        GroupID: this.initialData.ScheduleRequest.GroupID,
        VacationWindowID: null,
        VacationWindowTypeID: days.length > 1 ? 2 : 1,
      }
    });
    return new RequestCalendar(newData);
  }

  isVacationWindowsChanged(): boolean {
    return _.some(this.initialData.VacationWindowList, vacation => !vacation.VacationWindowID);
  }

  isVacationWindowsValid(): boolean {
    return _.every(this.vacationDays, vacationDay => !!vacationDay);
  }

  addBlankVacationDay() {
    this.vacationDays.push(null);
  }
}
