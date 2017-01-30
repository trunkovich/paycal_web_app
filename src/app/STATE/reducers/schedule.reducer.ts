/**
 * Created by TrUnK on 16.01.2017.
 */
import * as moment from 'moment';
import * as _ from 'lodash';

import * as scheduleActions from '../actions/schedule.actions';
import {GroupSchedule} from '../models/group-schedule.model';
import {
  EmployeeScheduleEntry, AvailableMonthsStructure,
  EmployeeScheduleEntryGroupedByDay
} from '../models/employee-schedule-entry.model';
import {CalendarTypes} from '../models/calendar.types';
import { createSelector } from 'reselect';
import {QualifiedEmployee} from '../models/employee.model';

export interface ScheduleState {
  groupScheduleMonths: GroupSchedule[];
  mySchedule: AvailableMonthsStructure;
  mySelectedDate: Date;
  homeViewType: CalendarTypes;
  scheduleLoading: boolean;
  shiftEmployees: QualifiedEmployee[];
}

const initialScheduleState = {
  groupScheduleMonths: [],
  mySchedule: {},
  mySelectedDate: new Date(),
  homeViewType: CalendarTypes.DAY,
  scheduleLoading: false,
  shiftEmployees: []
};

export function scheduleReducer(state: ScheduleState = initialScheduleState, action: scheduleActions.Actions): ScheduleState {
  switch (action.type) {
    case scheduleActions.ActionTypes.CLEAN_SCHEDULE: {
      return Object.assign({}, initialScheduleState);
    }
    case scheduleActions.ActionTypes.LOAD_SHIFT_EMPLOYEES_CLEAN: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType,
        scheduleLoading: state.scheduleLoading,
        shiftEmployees: []
      };
    }
    case scheduleActions.ActionTypes.LOAD_MY_FULL_SCHEDULE:
    case scheduleActions.ActionTypes.LOAD_SHIFT_EMPLOYEES:
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType,
        scheduleLoading: true,
        shiftEmployees: state.shiftEmployees
      };
    }
    case scheduleActions.ActionTypes.LOAD_SHIFT_EMPLOYEES_SUCCESS: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType,
        scheduleLoading: false,
        shiftEmployees: [...action.payload]
      };
    }
    case scheduleActions.ActionTypes.TOGGLE_SELECTION: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType,
        scheduleLoading: false,
        shiftEmployees: state.shiftEmployees.map((employee) => {
          if (employee.employee.EmployeeID === action.payload.employee.EmployeeID) {
            return Object.assign({}, employee, {selected: !employee.selected});
          } else {
            return employee;
          }
        })
      };
    }
    case scheduleActions.ActionTypes.REMOVE_UNSELECTED_SHIFT_EMPLOYEES: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType,
        scheduleLoading: false,
        shiftEmployees: state.shiftEmployees.filter((employee) => employee.selected)
      };
    }
    case scheduleActions.ActionTypes.LOAD_SHIFT_EMPLOYEES_FAIL: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType,
        scheduleLoading: false,
        shiftEmployees: []
      };
    }
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_FINALLY: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType,
        scheduleLoading: false,
        shiftEmployees: state.shiftEmployees
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
        scheduleLoading: true,
        shiftEmployees: state.shiftEmployees
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
        scheduleLoading: state.scheduleLoading,
        shiftEmployees: state.shiftEmployees
      };
    }
    case scheduleActions.ActionTypes.SET_MY_SELECTED_DATE: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: new Date(action.payload),
        homeViewType: state.homeViewType,
        scheduleLoading: state.scheduleLoading,
        shiftEmployees: state.shiftEmployees
      };
    }
    case scheduleActions.ActionTypes.SET_HOME_VIEW_TYPE: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        mySchedule: state.mySchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: action.payload,
        scheduleLoading: state.scheduleLoading,
        shiftEmployees: state.shiftEmployees
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
export const getShiftEmployees = (state: ScheduleState) => state.shiftEmployees;

export const getMyAllScheduleEntries = createSelector(
  getMySchedule,
  (mySchedule: AvailableMonthsStructure): EmployeeScheduleEntry[] | boolean => {
    let entries: EmployeeScheduleEntry[] = [];
    for (let key in mySchedule) {
      if (!mySchedule.hasOwnProperty(key)) {
        continue;
      }
      entries = entries.concat(mySchedule[key].entries);
    }
    return entries;
  }
);

export const getSortedShiftEmployees = createSelector(
  getShiftEmployees,
  (employees: QualifiedEmployee[]) => {
    return _.sortBy(employees, 'employee.LastName');
  }
);

export const getSelectedDateSchedule = createSelector(
  getMySchedule,
  getMySelectedDate,
  getHomeViewType,
  (mySchedule: AvailableMonthsStructure, date: Date, type: CalendarTypes): EmployeeScheduleEntry[] | boolean => {
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
          if (!mySchedule[`${year}.${month}`].entries) {
            return false;
          }
          return mySchedule[`${year}.${month}`].entries.filter((scheduleEntry: EmployeeScheduleEntry) => {
            return scheduleEntry.Year === year &&
              scheduleEntry.Month === month &&
              scheduleEntry.Day >= start.date() &&
              scheduleEntry.Day <= end.date();
          });
        } else {
          let arr1 = mySchedule[`${start.year()}.${start.month() + 1}`] ? mySchedule[`${start.year()}.${start.month() + 1}`].entries : [];
          let arr2 = mySchedule[`${end.year()}.${end.month() + 1}`] ? mySchedule[`${end.year()}.${end.month() + 1}`].entries : [];
          entries = arr1
            .concat(arr2)
            .filter((scheduleEntry: EmployeeScheduleEntry) => {
              let entryDate = moment({year: scheduleEntry.Year, month: scheduleEntry.Month - 1, date: scheduleEntry.Day}).add(1, 'minute');
              return entryDate.isBetween(start, end);
            });
        }
        return entries;
      }
    }
  }
);

const SORT_ORDER = {
  'AM': 1,
  'PM': 2,
  'EV': 3,
  'OV': 4,
  '24': 5,
};
export const getSortedSelectedDateSchedule = createSelector(
  getSelectedDateSchedule,
  (entries: EmployeeScheduleEntry[]): EmployeeScheduleEntry[] => {
    return _.sortBy(entries, entry => SORT_ORDER[entry.ShiftCode] || 10);
  }
);

export const getScheduleEntryById = id => {
  return createSelector(
    getMyAllScheduleEntries,
    (entries: EmployeeScheduleEntry[]): EmployeeScheduleEntry => {
      if (!entries) {
        return null;
      }
      return entries.filter(entry => entry.EmployeeScheduleEntryID === id)[0];
    }
  );
};

export const getSelectedDateScheduleGroupedByDay = createSelector(
  getSelectedDateSchedule,
  (entries: EmployeeScheduleEntry[]): EmployeeScheduleEntryGroupedByDay[] | boolean => {
    if (!entries) {
      return false;
    }
    let groupedEntries = {};
    let groupedEntriesArr: EmployeeScheduleEntryGroupedByDay[] = [];
    entries.forEach((entry) => {
      if (!groupedEntries[`${entry.Year}.${entry.Month}.${entry.Day}`]) {
        groupedEntries[`${entry.Year}.${entry.Month}.${entry.Day}`] = [];
      }
      groupedEntries[`${entry.Year}.${entry.Month}.${entry.Day}`].push(entry);
    });
    Object.keys(groupedEntries).forEach((key) => {
      groupedEntriesArr.push({
        date: moment(key, 'YYYY.MM.DD'),
        entries: groupedEntries[key]
      });
    });
    return groupedEntriesArr;
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

export const isAnyPhysicianSelected = createSelector(
  getShiftEmployees,
  (shiftEmployees: QualifiedEmployee[]) => {
    return shiftEmployees.some((shiftEmployee) => shiftEmployee.selected);
  }
);
