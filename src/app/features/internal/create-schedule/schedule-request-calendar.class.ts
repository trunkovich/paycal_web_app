import * as _ from 'lodash';
import * as moment from 'moment';

import * as requestModels from '../../../STATE/models/create-schedule.model';

export interface DayEntry {
  date: number | null;
  blank: boolean;
  disabled: boolean;
  event: string;
}

export type VacationDays = Array<moment.Moment | null>;
export type CallUnavailabilityDay = { date: moment.Moment; type: number; };
export type CallUnavailabilityDays = Array<CallUnavailabilityDay | null>;
export type EducationLeave = { date: moment.Moment; name: string; description: string; };
export type EducationLeaves = Array<EducationLeave | null>;
export type CallNight = moment.Moment;
export type CallNights = {[key: string ]: CallNight };

export class RequestCalendar {
  month: number;
  year: number;
  vacationDays: VacationDays;
  callUnavailabilityDates: CallUnavailabilityDays;
  educationLeaves: EducationLeaves;
  callNights: CallNights;
  days: DayEntry[];
  events = {};
  private initialData: requestModels.CreateScheduleDetailsModel;

  constructor(request: requestModels.CreateScheduleDetailsModel) {
    this.initialData = request;
    this.month = request.ScheduleRequest.ScheduleMonth - 1;
    this.year = request.ScheduleRequest.ScheduleYear;

    this.fillVacationDays(request.VacationWindowList);
    this.fillCallUnavailabilityDays(request.CallUnavailabilityWindowList);
    this.fillEducationLeaves(request.EducationalLeaveList);
    this.fillCallNights(request.PreferredCallNightList);


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
    return _.every(this.vacationDays, vacationDay => {
      return !!vacationDay && vacationDay.isValid();
    });
  }
  addBlankVacationDay() {
    this.vacationDays.push(null);
  }




  fillCallUnavailabilityDays(callUnavailabilityWindowList: requestModels.CallUnavailabilityWindowModel[]) {
    if (callUnavailabilityWindowList.length) {
      this.callUnavailabilityDates = _.map(
        callUnavailabilityWindowList,
        (day: requestModels.CallUnavailabilityWindowModel) => {
          return {
            date: moment(day.Date),
            type: day.CallUnavailabilityTypeID
          }
        });
      _.each(this.callUnavailabilityDates, (day: CallUnavailabilityDay) => this.events[day.date.date()] = '#5dcf5e');
    } else {
      this.callUnavailabilityDates = [{date: null, type: 1}];
    }
  }
  setCallUnavailabilityDays(days: CallUnavailabilityDays): RequestCalendar {
    let newData = _.cloneDeep<requestModels.CreateScheduleDetailsModel>(this.initialData);
    newData.CallUnavailabilityWindowList = _.map(days, day => {
      return {
        CallUnavailabilityWindowID: null,
        CallUnavailabilityTypeID: day.type,
        Date: day.date ? day.date.toISOString() : null,
        ScheduleRequestID: this.initialData.ScheduleRequest.ScheduleRequestID,
        EmployeeID: this.initialData.ScheduleRequest.EmployeeID,
        GroupID: this.initialData.ScheduleRequest.GroupID,
      }
    });
    return new RequestCalendar(newData);
  }
  isCallUnavailabilityWindowsChanged(): boolean {
    return _.some(this.initialData.CallUnavailabilityWindowList, day => !day.CallUnavailabilityWindowID);
  }
  isCallUnavailabilityWindowsValid(): boolean {
    return _.every(this.callUnavailabilityDates, day => {
      return !!day && day.date && day.date.isValid();
    });
  }
  addBlankCallUnavailabilityDay() {
    this.callUnavailabilityDates.push({date: null, type: 1});
  }




  fillEducationLeaves(educationLeaves: requestModels.EducationalLeaveModel[]) {
    if (educationLeaves.length) {
      this.educationLeaves = _.map(
        educationLeaves,
        (day: requestModels.EducationalLeaveModel) => {
          return {
            date: moment(day.Date),
            name: day.ActivityName,
            description: day.ActivityDescription
          }
        });
      _.each(this.educationLeaves, (day: EducationLeave) => this.events[day.date.date()] = '#4a90e2');
    } else {
      this.educationLeaves = [{date: null, name: '', description: ''}];
    }
  }
  setEducationLeaves(days: EducationLeaves): RequestCalendar {
    let newData = _.cloneDeep<requestModels.CreateScheduleDetailsModel>(this.initialData);
    newData.EducationalLeaveList = _.map(days, day => {
      return {
        EducationalLeaveID: null,
        ActivityName: day.name,
        ActivityDescription: day.description,
        Date: day.date ? day.date.toISOString() : null,
        ScheduleRequestID: this.initialData.ScheduleRequest.ScheduleRequestID,
        EmployeeID: this.initialData.ScheduleRequest.EmployeeID,
        GroupID: this.initialData.ScheduleRequest.GroupID,
      }
    });
    return new RequestCalendar(newData);
  }
  isEducationLeavesChanged(): boolean {
    return _.some(this.initialData.EducationalLeaveList, day => !day.EducationalLeaveID);
  }
  isEducationLeavesValid(): boolean {
    return _.every(this.educationLeaves, day => {
      return !!day && day.date && day.date.isValid() && day.name && day.description;
    });
  }
  addBlankEducationLeave() {
    this.educationLeaves.push({date: null, name: '', description: ''});
  }




  fillCallNights(callNights: requestModels.PreferredCallNightModel[]) {
    this.callNights = {1: null, 2: null, 3: null, 4: null, 5: null};
    if (callNights.length) {
      let nights = _.map(
        callNights,
        (day: requestModels.PreferredCallNightModel) => day.Date ? moment(day.Date) : null);
      _.each(nights, (day: CallNight, index) => {
        this.callNights[index + 1] = day;
        if (day && day.isValid()) {
          this.events[day.date()] = '#f978a7';
        }
      });
    }
  }
  setCallNights(days: CallNights): RequestCalendar {
    let newData = _.cloneDeep<requestModels.CreateScheduleDetailsModel>(this.initialData);
    newData.PreferredCallNightList = _.map(days, (day, key) => {
      if (!day) {
        return null;
      }
      return {
        PreferredCallNightID: null,
        CallNightTypeID: +key,
        Date: day ? day.toISOString() : null,
        ScheduleRequestID: this.initialData.ScheduleRequest.ScheduleRequestID,
        EmployeeID: this.initialData.ScheduleRequest.EmployeeID,
        GroupID: this.initialData.ScheduleRequest.GroupID,
      }
    });
    newData.PreferredCallNightList = _.filter(newData.PreferredCallNightList, night => !!night);
    return new RequestCalendar(newData);
  }
  isCallNightsChanged(): boolean {
    return _.some(this.initialData.PreferredCallNightList, day => !day.PreferredCallNightID);
  }
  isCallNightsValid(): boolean {
    return _.every(this.callNights, (day, key) => {
      if (key && (+key > 2)) {
        return !!day && day.isValid() || !day;
      }
      return !!day && day.isValid();
    });
  }
}
