/**
 * Created by TrUnK on 16.01.2017.
 */
import * as moment from 'moment';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

import * as scheduleActions from '../actions/schedule.actions';
import {GroupSchedule} from '../models/group-schedule.model';
import {EmployeeScheduleEntry, AvailableMonthsStructure, EmployeeScheduleEntryGroupedByDay} from '../models/employee-schedule-entry.model';
import {CalendarTypes} from '../models/calendar.types';
import {QualifiedEmployee, QualifiedEmployeeGroup} from '../models/employee.model';

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
      return _.cloneDeep(initialScheduleState);
    }
    case scheduleActions.ActionTypes.CLEAN_SHIFT_EMPLOYEES: {
      return cleanShiftEmployeesHandler(state);
    }
    case scheduleActions.ActionTypes.LOAD_MY_FULL_SCHEDULE:
    case scheduleActions.ActionTypes.LOAD_SHIFT_EMPLOYEES:
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE: {
      return setLoadingHandler(state);
    }
    case scheduleActions.ActionTypes.LOAD_SHIFT_EMPLOYEES_SUCCESS: {
      return loadShiftEmployeesListHandler(setNotLoadingHandler(state), action);
    }
    case scheduleActions.ActionTypes.TOGGLE_SELECTION: {
      return toggleSelectionHandler(setNotLoadingHandler(state), action);
    }
    case scheduleActions.ActionTypes.REMOVE_UNSELECTED_SHIFT_EMPLOYEES: {
      return removeUnselectedEmployeesHandler(state);
    }
    case scheduleActions.ActionTypes.LOAD_SHIFT_EMPLOYEES_FAIL: {
      return loadShiftEmployeesListFailHandler(setNotLoadingHandler(state));
    }
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_FINALLY: {
      return setNotLoadingHandler(state);
    }
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS: {
      return loadGroupScheduleMonthsHandler(setLoadingHandler(state), action);
    }
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_SUCCESS: {
      return loadMyMonthScheduleHandler(state, action);
    }
    case scheduleActions.ActionTypes.SET_MY_SELECTED_DATE: {
      return setMySelectedDateHandler(state, action);
    }
    case scheduleActions.ActionTypes.SET_HOME_VIEW_TYPE: {
      return setHomeViewTypeHandler(state, action);
    }
    default: {
      return state;
    }
  }
}
/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
function setLoadingHandler(state: ScheduleState) {
  return _.assign({}, state, {
    scheduleLoading: true
  });
}

function setNotLoadingHandler(state: ScheduleState) {
  return _.assign({}, state, {
    scheduleLoading: false
  });
}

function cleanShiftEmployeesHandler(state: ScheduleState) {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = [];
  return newState;
}

function loadShiftEmployeesListHandler(state: ScheduleState, action: scheduleActions.LoadShiftEmployeesSuccessAction) {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = _.cloneDeep(action.payload);
  return newState;
}

function toggleSelectionHandler(state: ScheduleState, action: scheduleActions.ToggleSelectionAction) {
  let newState = _.assign({}, state, {
    shiftEmployees: _.clone(state.shiftEmployees)
  });
  const employeeIndex = _.findIndex(newState.shiftEmployees, (emp) => emp.employee.EmployeeID === action.payload.employee.EmployeeID);
  const employee = _.clone(newState.shiftEmployees[employeeIndex]);
  employee.selected = !employee.selected;
  newState.shiftEmployees[employeeIndex] = employee;
  return newState;
}

function removeUnselectedEmployeesHandler(state: ScheduleState) {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = _.filter(newState.shiftEmployees, 'selected');
  return newState;
}

function loadShiftEmployeesListFailHandler(state: ScheduleState) {
  let newState = _.cloneDeep(state);
  newState.scheduleLoading = false;
  newState.shiftEmployees = [];
  return newState;
}

function loadGroupScheduleMonthsHandler(state: ScheduleState, action: scheduleActions.LoadGroupScheduleMonthsSuccessAction) {
  let newMonths = false;
  let newSchedule = _.cloneDeep(state.mySchedule);
  _.each(action.payload, (scheduleMonth) => {
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

  let newState = _.cloneDeep(state);
  newState.groupScheduleMonths = _.cloneDeep(action.payload);
  if (newMonths) {
    newState.mySchedule = _.assign({}, newSchedule);
  }
  return newState;
}

function loadMyMonthScheduleHandler(state: ScheduleState, action: scheduleActions.LoadMyMonthScheduleSuccessAction) {
  if (!action.payload.loaded) {
    // error while loading
    return state;
  }
  let newState = _.cloneDeep(state);
  let loadedMonthWrapper = {};
  loadedMonthWrapper[`${action.payload.dateString}`] = Object.assign({}, action.payload);
  newState.mySchedule = _.assign({}, newState.mySchedule, loadedMonthWrapper);
  return newState;
}

function setMySelectedDateHandler(state: ScheduleState, action: scheduleActions.SetMySelectedDateAction) {
  let newState = _.cloneDeep(state);
  newState.mySelectedDate = new Date(action.payload);
  return newState;
}

function setHomeViewTypeHandler(state: ScheduleState, action: scheduleActions.SetHomeViewTypeAction) {
  let newState = _.cloneDeep(state);
  newState.homeViewType = action.payload;
  return newState;
}



/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
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
  (employees: QualifiedEmployee[]): QualifiedEmployee[] => {
    return _.sortBy(employees, 'employee.LastName');
  }
);

export const getGroupedSortedShiftEmployees = createSelector(
  getSortedShiftEmployees,
  (employees: QualifiedEmployee[]): QualifiedEmployeeGroup[] => {
    let groups: QualifiedEmployeeGroup[] = [];
    let grouped = _.groupBy(employees, employee => {
      if (!employee.employee.LastName) {
        return 'OTHERS';
      }
      return employee.employee.LastName.slice(0, 1).toUpperCase();
    });
    for (let key in grouped) {
      if (!grouped.hasOwnProperty(key)) {
        continue;
      }
      groups.push({letter: key, physicians: grouped[key]});
    }
    return groups;
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
