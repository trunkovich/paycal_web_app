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
import {QualifiedEmployee, QualifiedEmployeeGroup, Employee} from '../models/employee.model';
import {SearchResults} from '../models/search-results.model';

export const ALLOWED_SEARCH_TYPES = ['physicians', 'call-reference', 'or-reference'];


export interface ScheduleState {
  groupScheduleMonths: GroupSchedule[];
  mySchedule: AvailableMonthsStructure;
  mySelectedDate: Date;
  homeViewType: CalendarTypes;
  shiftEmployees: QualifiedEmployee[];
  searchType: string | null;
  scheduleLoading: boolean;
  physiciansLoading: boolean;
  callReferenceLaborCodes: string[];
  orReferenceLaborCodes: string[];
  employeesInGroup: Employee[];
  search: string;
}

const initialScheduleState = {
  groupScheduleMonths: [],
  mySchedule: {},
  mySelectedDate: new Date(),
  homeViewType: CalendarTypes.DAY,
  shiftEmployees: [],
  searchType: null,
  scheduleLoading: false,
  physiciansLoading: false,
  callReferenceLaborCodes: null,
  orReferenceLaborCodes: null,
  employeesInGroup: null,
  search: ''
};


export function scheduleReducer(state: ScheduleState = initialScheduleState, action: scheduleActions.Actions): ScheduleState {
  switch (action.type) {
    case scheduleActions.ActionTypes.CLEAN_SCHEDULE: {
      return _.cloneDeep(initialScheduleState);
    }
    case scheduleActions.ActionTypes.CLEAN_SHIFT_EMPLOYEES: {
      return cleanShiftEmployeesHandler(state);
    }
    case scheduleActions.ActionTypes.LOAD_CALL_REFERENCE_SUCCESS: {
      return loadCallReferenceHandler(setNotLoadingHandler(state), action);
    }
    case scheduleActions.ActionTypes.LOAD_OR_REFERENCE_SUCCESS: {
      return loadOrReferenceHandler(setNotLoadingHandler(state), action);
    }
    case scheduleActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP_SUCCESS: {
      return loadEmployeesInGroupHandler(setNotLoadingHandler(state), action);
    }
    case scheduleActions.ActionTypes.SET_SEARCH_TYPE: {
      return setSearchTypeHandler(state, action);
    }
    case scheduleActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP:
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE:
    case scheduleActions.ActionTypes.LOAD_MY_FULL_SCHEDULE:
    case scheduleActions.ActionTypes.LOAD_SHIFT_EMPLOYEES:
    case scheduleActions.ActionTypes.LOAD_CALL_REFERENCE:
    case scheduleActions.ActionTypes.LOAD_OR_REFERENCE: {
      return setScheduleLoadingHandler(state);
    }
    case scheduleActions.ActionTypes.SET_EMPLOYEES_LOADING: {
      return setPhysiciansLoadingHandler(state);
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
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_FINALLY:
    case scheduleActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP_FAIL:
    case scheduleActions.ActionTypes.LOAD_CALL_REFERENCE_FAIL:
    case scheduleActions.ActionTypes.LOAD_OR_REFERENCE_FAIL: {
      return setNotLoadingHandler(state);
    }
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS: {
      return loadGroupScheduleMonthsHandler(setScheduleLoadingHandler(state), action);
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
    case scheduleActions.ActionTypes.SET_SEARCH_TEXT: {
      return setSearchTextHandler(state, action);
    }
    default: {
      return state;
    }
  }
}
/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
function setScheduleLoadingHandler(state: ScheduleState): ScheduleState {
  return _.assign({}, state, {
    scheduleLoading: true
  });
}

function setSearchTypeHandler(state: ScheduleState, action: scheduleActions.SetSearchType): ScheduleState {
  let newState = _.cloneDeep(state);
  if (action.payload !== newState.searchType) {
    newState.searchType = action.payload;
    newState.search = '';
  }
  return newState;
}

function loadCallReferenceHandler(state: ScheduleState, action: scheduleActions.LoadCallReferenceSuccessAction): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.callReferenceLaborCodes = _.clone(action.payload);
  return newState;
}

function loadOrReferenceHandler(state: ScheduleState, action: scheduleActions.LoadOrReferenceSuccessAction): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.orReferenceLaborCodes = _.clone(action.payload);
  return newState;
}

function loadEmployeesInGroupHandler(state: ScheduleState, action: scheduleActions.LoadEmployeesInGroupSuccessAction): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.employeesInGroup = _.clone(action.payload);
  return newState;
}

function setSearchTextHandler(state: ScheduleState, action: scheduleActions.SetSearchTextAction): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.search = _.clone(action.payload);
  return newState;
}

function setPhysiciansLoadingHandler(state: ScheduleState): ScheduleState {
  return _.assign({}, state, {
    physiciansLoading: true
  });
}

function setNotLoadingHandler(state: ScheduleState): ScheduleState {
  return _.assign({}, state, {
    scheduleLoading: false,
    physiciansLoading: false
  });
}

function cleanShiftEmployeesHandler(state: ScheduleState): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = [];
  return newState;
}

function loadShiftEmployeesListHandler(state: ScheduleState, action: scheduleActions.LoadShiftEmployeesSuccessAction): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = _.cloneDeep(action.payload);
  return newState;
}

function toggleSelectionHandler(state: ScheduleState, action: scheduleActions.ToggleSelectionAction): ScheduleState {
  let newState = _.assign({}, state, {
    shiftEmployees: _.clone(state.shiftEmployees)
  });
  const employeeIndex = _.findIndex(newState.shiftEmployees, (emp) => emp.employee.EmployeeID === action.payload.employee.EmployeeID);
  const employee = _.clone(newState.shiftEmployees[employeeIndex]);
  employee.selected = !employee.selected;
  newState.shiftEmployees[employeeIndex] = employee;
  return newState;
}

function removeUnselectedEmployeesHandler(state: ScheduleState): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.shiftEmployees = _.filter(newState.shiftEmployees, 'selected');
  return newState;
}

function loadShiftEmployeesListFailHandler(state: ScheduleState): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.scheduleLoading = false;
  newState.shiftEmployees = [];
  return newState;
}

function loadGroupScheduleMonthsHandler(state: ScheduleState, action: scheduleActions.LoadGroupScheduleMonthsSuccessAction): ScheduleState {
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

function loadMyMonthScheduleHandler(state: ScheduleState, action: scheduleActions.LoadMyMonthScheduleSuccessAction): ScheduleState {
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

function setMySelectedDateHandler(state: ScheduleState, action: scheduleActions.SetMySelectedDateAction): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.mySelectedDate = new Date(action.payload);
  return newState;
}

function setHomeViewTypeHandler(state: ScheduleState, action: scheduleActions.SetHomeViewTypeAction): ScheduleState {
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
export const getPhysiciansLoadingStatus = (state: ScheduleState) => state.physiciansLoading;
export const getShiftEmployees = (state: ScheduleState) => state.shiftEmployees;
export const getSearchType = (state: ScheduleState) => state.searchType;
export const getCallReferenceList = (state: ScheduleState) => state.callReferenceLaborCodes;
export const getOrReferenceList = (state: ScheduleState) => state.orReferenceLaborCodes;
export const getEmployeesInGroupList = (state: ScheduleState) => state.employeesInGroup;
export const getSearchText = (state: ScheduleState) => state.search;

export const getFilteredCallReferenceList = createSelector(
  getCallReferenceList,
  getSearchText,
  (callReferenceList: string[], search: string) => _.filter(callReferenceList, _.partial(_.includes, _, search))
);

export const getFilteredOrReferenceList = createSelector(
  getOrReferenceList,
  getSearchText,
  (orReferenceList: string[], search: string) => _.filter(orReferenceList, _.partial(_.includes, _, search))
);

export const getSortedEmployeeInGroup = createSelector(
  getEmployeesInGroupList,
  (employees: Employee[]): Employee[] => {
    return _.sortBy(employees, 'LastName');
  }
);

export const getFilteredEmployeesInGroupList = createSelector(
  getSortedEmployeeInGroup,
  getSearchText,
  (employeesList: Employee[], search: string) => {
    let search1, search2;
    if (search.split(' ').length > 1) {
      search1 = search.split(' ')[0];
      search2 = search.split(' ')[1];
      return _.filter(employeesList, (employee) => {
        return _.includes(employee.FirstName, search1) && _.includes(employee.LastName, search2) ||
          _.includes(employee.FirstName, search2) && _.includes(employee.LastName, search1);
      });
    }
    return _.filter(employeesList, (employee) => _.includes(employee.FirstName, search) || _.includes(employee.LastName, search));
  }
);

export const getGroupedSortedEmployeesInGroup = createSelector(
  getFilteredEmployeesInGroupList,
  (employees: Employee[]): SearchResults[] => {
    let groups: SearchResults[] = [];
    let grouped = _.groupBy(employees, employee => {
      if (!employee.LastName) {
        return 'OTHERS';
      }
      return employee.LastName.slice(0, 1).toUpperCase();
    });
    _.each(grouped, (group, key) => {
      groups.push({letter: key, entries: group});
    });
    return groups;
  }
);

export const getSearchResults = createSelector(
  getSearchType,
  getFilteredCallReferenceList,
  getFilteredOrReferenceList,
  getGroupedSortedEmployeesInGroup,
  (type: string, callReferenceList: string[], orReferenceList: string[], employeesList: SearchResults[]): SearchResults[] => {
    switch (type) {
      case 'physicians': {
        return employeesList;
      }
      case 'call-reference': {
        return [{letter: null, entries: callReferenceList}];
      }
      case 'or-reference': {
        return [{letter: null, entries: orReferenceList}];
      }
    }
    return [];
  }
);

export const getMyAllScheduleEntries = createSelector(
  getMySchedule,
  (mySchedule: AvailableMonthsStructure): EmployeeScheduleEntry[] | boolean => {
    let entries: EmployeeScheduleEntry[] = [];
    _.each(mySchedule, (value) => {
      entries = _.concat(entries, value.entries);
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
        return _.filter(mySchedule[`${year}.${month}`].entries, (scheduleEntry: EmployeeScheduleEntry) => {
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
          return _.filter(mySchedule[`${year}.${month}`].entries, (scheduleEntry: EmployeeScheduleEntry) => {
            return scheduleEntry.Year === year &&
              scheduleEntry.Month === month &&
              scheduleEntry.Day >= start.date() &&
              scheduleEntry.Day <= end.date();
          });
        } else {
          let arr1 = mySchedule[`${start.year()}.${start.month() + 1}`] ? mySchedule[`${start.year()}.${start.month() + 1}`].entries : [];
          let arr2 = mySchedule[`${end.year()}.${end.month() + 1}`] ? mySchedule[`${end.year()}.${end.month() + 1}`].entries : [];
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
  (entries: EmployeeScheduleEntry[]): EmployeeScheduleEntryGroupedByDay[] | boolean => {
    if (!entries) {
      return false;
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
