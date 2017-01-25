/**
 * Created by TrUnK on 16.01.2017.
 */
import * as moment from 'moment';

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
  scheduleLoading: boolean;
}

const initialScheduleState = {
  groupScheduleMonths: [],
  mySchedule: {},
  mySelectedDate: new Date(),
  homeViewType: CalendarTypes.DAY,
  scheduleLoading: false
};

export function scheduleReducer(state: ScheduleState = initialScheduleState, action: scheduleActions.Actions): ScheduleState {
  switch (action.type) {
    case scheduleActions.ActionTypes.LOAD_MY_FULL_SCHEDULE: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType,
        scheduleLoading: true
      };
    }
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_FINALLY: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType,
        scheduleLoading: false
      };
    }
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
        homeViewType: state.homeViewType,
        scheduleLoading: true
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
        homeViewType: state.homeViewType,
        scheduleLoading: state.scheduleLoading
      };
    }
    case scheduleActions.ActionTypes.SET_MY_SELECTED_DATE: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: new Date(action.payload),
        homeViewType: state.homeViewType,
        scheduleLoading: state.scheduleLoading
      };
    }
    case scheduleActions.ActionTypes.SET_HOME_VIEW_TYPE: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: action.payload,
        scheduleLoading: state.scheduleLoading
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
export const getScheduleLoadingState = (state: ScheduleState) => state.scheduleLoading;

export const getSelectedDateSchedule = createSelector(
  getMySchedule,
  getMySelectedDate,
  getHomeViewType,
  (mySchedule: AvailableMonthsStructure, date: Date, type: CalendarTypes) => {
    let m = moment(date);
    let day = m.date();
    let month = m.month() + 1;
    let year = m.year();
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
      case CalendarTypes.WEEK:
      case CalendarTypes.TWO_WEEK: {
        let start = moment(m).startOf('week');
        let end = moment(m).endOf('week');
        if (type === CalendarTypes.TWO_WEEK) {
          end.add(1, 'week');
        }
        let entries: EmployeeScheduleEntry[] = [];
        if (start.isSame(end, 'month')) {
          return mySchedule[`${year}.${month}`].entries.filter((scheduleEntry: EmployeeScheduleEntry) => {
            return scheduleEntry.Year === year &&
              scheduleEntry.Month === month &&
              scheduleEntry.Day >= start.date() &&
              scheduleEntry.Day <= end.date();
          });
        } else {
          entries = mySchedule[`${start.year()}.${start.month() + 1}`].entries
            .concat(mySchedule[`${end.year()}.${end.month() + 1}`].entries)
            .filter((scheduleEntry: EmployeeScheduleEntry) => {
              let entryDate = moment({year: scheduleEntry.Year, month: scheduleEntry.Month - 1, date: scheduleEntry.Day});
              return entryDate.isBetween(start, end);
            });
        }
        return entries;
      }
    }
  }
);

export const getTotalWorkCount = createSelector(
  getSelectedDateSchedule,
  (scheduleEntries: EmployeeScheduleEntry[]) => {
    if (!scheduleEntries) {
      return 0;
    }
    return scheduleEntries.reduce((sum: number, entry: EmployeeScheduleEntry) => sum + (entry.WorkUnitPoints || 0), 0);
  }
);
