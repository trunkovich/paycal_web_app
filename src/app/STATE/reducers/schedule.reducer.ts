/**
 * Created by TrUnK on 16.01.2017.
 */
import * as scheduleActions from '../actions/schedule.actions';
import {GroupSchedule} from '../models/group-schedule.model';
import {EmployeeScheduleEntry, AvailableMonthsStructure} from '../models/employee-schedule-entry.model';
import {CalendarTypes} from '../models/calendar.types';
import { createSelector } from 'reselect';

export interface ScheduleState {
  groupScheduleMonths: GroupSchedule[];
  mySchedule: AvailableMonthsStructure;
  mySelectedDate: Date;
  homeViewType: CalendarTypes;
}

const initialScheduleState = {
  groupScheduleMonths: [],
  mySchedule: {},
  mySelectedDate: new Date(),
  homeViewType: CalendarTypes.TWO_WEEK
};

export function scheduleReducer(state: ScheduleState = initialScheduleState, action: scheduleActions.Actions): ScheduleState {
  switch (action.type) {
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS: {
      let newMonths = false;
      let newSchedule = Object.assign({}, state.mySchedule);
      action.payload.forEach((scheduleMonth) => {
        if (!newSchedule[`${scheduleMonth.Year}.${scheduleMonth.Month}`]) {
          newMonths = true;
          newSchedule[`${scheduleMonth.Year}.${scheduleMonth.Month}`] = {
            dateString: `${scheduleMonth.Year}.${scheduleMonth.Month}`,
            loaded: false,
            entries: [],
            month: scheduleMonth.Month,
            year: scheduleMonth.Year
          };
        }
      });
      return {
        groupScheduleMonths: [...action.payload],
        mySchedule: newMonths ? Object.assign({}, newSchedule) : state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType
      };
    }
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_SUCCESS: {
      if (!action.payload.loaded) {
        // error while loading
        return state;
      }
      let loadedMonthWrapper = {};
      loadedMonthWrapper[`${action.payload.dateString}`] = Object.assign({}, action.payload);
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: Object.assign({}, state.mySchedule, loadedMonthWrapper),
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType
      };
    }
    case scheduleActions.ActionTypes.SET_MY_SELECTED_DATE: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: new Date(action.payload),
        homeViewType: state.homeViewType
      };
    }
    default: {
      return state;
    }
  }
}

export const getScheduleMonths = (state: ScheduleState) => state.groupScheduleMonths;
export const getMySchedule = (state: ScheduleState) => state.mySchedule;
export const getMySelectedDate = (state: ScheduleState) => state.mySelectedDate;
export const getHomeViewType = (state: ScheduleState) => state.homeViewType;

export const getSelectedDateSchedule = createSelector(
  getMySchedule,
  getMySelectedDate,
  getHomeViewType,
  (mySchedule: AvailableMonthsStructure, date: Date, type: CalendarTypes) => {
    console.log('getDailySchedule');
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (!mySchedule[`${year}.${month}`]) {
      return false;
    }
    switch (type) {
      case CalendarTypes.DAY: {
        return mySchedule[`${year}.${month}`].entries.filter((scheduleEntry: EmployeeScheduleEntry) => {
          return scheduleEntry.Year === year &&
                scheduleEntry.Month === month &&
                scheduleEntry.Day === day;
        });
      }
      case CalendarTypes.WEEK: {
        let firstDay = day;
        let lastDay = day + 6;
        return mySchedule[`${year}.${month}`].entries.filter((scheduleEntry: EmployeeScheduleEntry) => {
          return scheduleEntry.Year === year &&
                scheduleEntry.Month === month &&
                scheduleEntry.Day >= firstDay &&
                scheduleEntry.Day <= lastDay;
        });
      }
      case CalendarTypes.TWO_WEEK: {
        let firstDay = day;
        let lastDay = day + 13;
        return mySchedule[`${year}.${month}`].entries.filter((scheduleEntry: EmployeeScheduleEntry) => {
          return scheduleEntry.Year === year &&
            scheduleEntry.Month === month &&
            scheduleEntry.Day >= firstDay &&
            scheduleEntry.Day <= lastDay;
        });
      }
    }
  }
);
