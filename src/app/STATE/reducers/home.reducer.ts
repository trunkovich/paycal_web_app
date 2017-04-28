/**
 * Created by TrUnK on 12.02.2017.
 */
import * as moment from 'moment';
import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as homeActions from '../actions/home.actions';
import {
  AvailableMonthsStructure,
  EmployeeScheduleEntry,
  EmployeeScheduleEntryGroupedByDay
} from '../models/employee-schedule-entry.model';
import { CalendarTypes } from '../models/calendar.types';
import { QualifiedEmployee, QualifiedEmployeeGroup } from '../models/employee.model';


export interface HomeState {
  mySchedule: AvailableMonthsStructure;
  mySelectedDate: Date;
  homeViewType: CalendarTypes;
  shiftEmployees: QualifiedEmployee[];
  loading: boolean;
  initLoading: boolean;
}

const initialHomeState = {
  mySchedule: {},
  mySelectedDate: new Date(),
  homeViewType: CalendarTypes.DAY,
  shiftEmployees: [],
  loading: false,
  initLoading: false
};


export function homeReducer(state: HomeState = initialHomeState, action: homeActions.Actions): HomeState {
  switch (action.type) {
    case homeActions.ActionTypes.CLEAN_SCHEDULE: {
      return _.cloneDeep(initialHomeState);
    }
    case homeActions.ActionTypes.CLEAN_SHIFT_EMPLOYEES: {
      return cleanShiftEmployeesHandler(state);
    }
    case homeActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE:
    case homeActions.ActionTypes.LOAD_MY_FULL_SCHEDULE:
    case homeActions.ActionTypes.SET_EMPLOYEES_LOADING:
    case homeActions.ActionTypes.LOAD_SHIFT_EMPLOYEES: {
      return setLoadingHandler(state, true);
    }
    case homeActions.ActionTypes.LOAD_MY_CURRENT_MONTH_SCHEDULE: {
      return setInitLoadingHandler(state, true);
    }
    case homeActions.ActionTypes.LOAD_SHIFT_EMPLOYEES_SUCCESS: {
      let newState = setLoadingHandler(state, false);
      return loadShiftEmployeesListHandler(newState, (action as homeActions.LoadShiftEmployeesSuccessAction));
    }
    case homeActions.ActionTypes.TOGGLE_SELECTION: {
      let newState = setLoadingHandler(state, false);
      return toggleSelectionHandler(newState, (action as homeActions.ToggleSelectionAction));
    }
    case homeActions.ActionTypes.REMOVE_UNSELECTED_SHIFT_EMPLOYEES: {
      return removeUnselectedEmployeesHandler(state);
    }
    case homeActions.ActionTypes.LOAD_SHIFT_EMPLOYEES_FAIL: {
      let newState = setLoadingHandler(state, false);
      return loadShiftEmployeesListFailHandler(newState);
    }
    case homeActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_FINALLY: {
      let newState = setInitLoadingHandler(state, false);
      return setLoadingHandler(newState, false);
    }
    case homeActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_SUCCESS: {
      let newState = setInitLoadingHandler(state, false);
      return loadMyMonthScheduleHandler(newState, (action as homeActions.LoadMyMonthScheduleSuccessAction));
    }
    case homeActions.ActionTypes.SET_MY_SELECTED_DATE: {
      return setMySelectedDateHandler(state, (action as homeActions.SetMySelectedDateAction));
    }
    case homeActions.ActionTypes.SET_HOME_VIEW_TYPE: {
      return setHomeViewTypeHandler(state, (action as homeActions.SetHomeViewTypeAction));
    }
    case homeActions.ActionTypes.FILL_MY_MONTH_SCHEDULE: {
      return fillMyMonthScheduleHandler(state, (action as homeActions.FillMyMonthsScheduleAction));
    }
    default: {
      return state;
    }
  }
}
/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
function setInitLoadingHandler(state: HomeState, status): HomeState {
  return _.assign({}, state, {
    initLoading: status
  });
}

function setLoadingHandler(state: HomeState, status): HomeState {
  return _.assign({}, state, {
    loading: status
  });
}

function fillMyMonthScheduleHandler(state: HomeState, action: homeActions.FillMyMonthsScheduleAction): HomeState {
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

  if (newMonths) {
    let newState = _.cloneDeep(state);
    newState.mySchedule = _.assign({}, newSchedule);
    return newState;
  } else {
    return state;
  }
}

function cleanShiftEmployeesHandler(state: HomeState): HomeState {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = [];
  return newState;
}

function loadShiftEmployeesListHandler(state: HomeState, action: homeActions.LoadShiftEmployeesSuccessAction): HomeState {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = _.cloneDeep(action.payload);
  return newState;
}

function toggleSelectionHandler(state: HomeState, action: homeActions.ToggleSelectionAction): HomeState {
  let newState = _.assign({}, state, {
    shiftEmployees: _.clone(state.shiftEmployees)
  });
  const employeeIndex = _.findIndex(newState.shiftEmployees, (emp) => emp.employee.EmployeeID === action.payload.employee.EmployeeID);
  const employee = _.clone(newState.shiftEmployees[employeeIndex]);
  employee.selected = !employee.selected;
  newState.shiftEmployees[employeeIndex] = employee;
  return newState;
}

function removeUnselectedEmployeesHandler(state: HomeState): HomeState {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = _.filter(newState.shiftEmployees, 'selected');
  return newState;
}

function loadShiftEmployeesListFailHandler(state: HomeState): HomeState {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = [];
  return newState;
}

function loadMyMonthScheduleHandler(state: HomeState, action: homeActions.LoadMyMonthScheduleSuccessAction): HomeState {
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

function setMySelectedDateHandler(state: HomeState, action: homeActions.SetMySelectedDateAction): HomeState {
  let newState = _.cloneDeep(state);
  newState.mySelectedDate = new Date(action.payload);
  return newState;
}

function setHomeViewTypeHandler(state: HomeState, action: homeActions.SetHomeViewTypeAction): HomeState {
  let newState = _.cloneDeep(state);
  newState.homeViewType = action.payload;
  return newState;
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getMySchedule = (state: HomeState) => state.mySchedule;
export const getMySelectedDate = (state: HomeState) => state.mySelectedDate;
export const getHomeViewType = (state: HomeState) => state.homeViewType;
export const getHomeLoadingState = (state: HomeState) => state.loading;
export const getHomeInitLoadingState = (state: HomeState) => state.initLoading;
export const getShiftEmployees = (state: HomeState) => state.shiftEmployees;

export const getMyAllScheduleEntries = createSelector(
  getMySchedule,
  (mySchedule: AvailableMonthsStructure): EmployeeScheduleEntry[] | boolean => {
    let entries: EmployeeScheduleEntry[] = [];
    _.each(mySchedule, (value) => {
      entries = _.concat(entries, <EmployeeScheduleEntry[]>value.entries);
    });
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
    _.each(grouped, (group, key) => {
      groups.push({letter: key, physicians: group});
    });
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
        return _.filter(<EmployeeScheduleEntry[]>mySchedule[`${year}.${month}`].entries, (scheduleEntry: EmployeeScheduleEntry) => {
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
          return _.filter(<EmployeeScheduleEntry[]>mySchedule[`${year}.${month}`].entries, (scheduleEntry: EmployeeScheduleEntry) => {
            return scheduleEntry.Year === year &&
              scheduleEntry.Month === month &&
              scheduleEntry.Day >= start.date() &&
              scheduleEntry.Day <= end.date();
          });
        } else {
          let arr1 = mySchedule[`${start.year()}.${start.month() + 1}`] ?
            <EmployeeScheduleEntry[]>mySchedule[`${start.year()}.${start.month() + 1}`].entries :
            [];

          let arr2 = mySchedule[`${end.year()}.${end.month() + 1}`] ?
            <EmployeeScheduleEntry[]>mySchedule[`${end.year()}.${end.month() + 1}`].entries :
            [];

          entries = _(arr1).concat(arr2)
            .filter((scheduleEntry: EmployeeScheduleEntry) => {
              let entryDate = moment({year: scheduleEntry.Year, month: scheduleEntry.Month - 1, date: scheduleEntry.Day}).add(1, 'minute');
              return entryDate.isBetween(start, end);
            })
            .value();
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
      return _.filter(entries, entry => entry.EmployeeScheduleEntryID === id)[0];
    }
  );
};

export const getSelectedDateScheduleGroupedByDay = createSelector(
  getSelectedDateSchedule,
  (entries: EmployeeScheduleEntry[]): EmployeeScheduleEntryGroupedByDay[] => {
    if (!entries) {
      return null;
    }
    let groupedEntries: {[key: string]: EmployeeScheduleEntry[]} = {};
    let groupedEntriesArr: EmployeeScheduleEntryGroupedByDay[] = [];
    _.each(entries, (entry) => {
      if (!groupedEntries[`${entry.Year}.${entry.Month}.${entry.Day}`]) {
        groupedEntries[`${entry.Year}.${entry.Month}.${entry.Day}`] = [];
      }
      groupedEntries[`${entry.Year}.${entry.Month}.${entry.Day}`].push(entry);
    });
    _.each(groupedEntries, (value, key) => {
      groupedEntriesArr.push({
        date: moment(key, 'YYYY.MM.DD'),
        entries: value
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
    return _.reduce(scheduleEntries, (sum: number, entry: EmployeeScheduleEntry) => sum + (entry.WorkUnitPoints || 0), 0);
  }
);

export const isAnyPhysicianSelected = createSelector(
  getShiftEmployees,
  (shiftEmployees: QualifiedEmployee[]) => {
    return _.some(shiftEmployees, (shiftEmployee) => shiftEmployee.selected);
  }
);
