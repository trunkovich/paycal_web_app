/**
 * Created by TrUnK on 12.02.2017.
 */
import * as moment from 'moment';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

import * as searchActions from '../actions/search.actions';
import {Employee} from '../models/employee.model';
import {SearchResults} from '../models/search-results.model';
import {CalendarTypes} from '../models/calendar.types';
import {AvailableMonthsStructure, EmployeeScheduleEntry, EmployeeScheduleEntryGroupedByDay} from '../models/employee-schedule-entry.model';
import {MasterCalendarEntry} from '../models/master-calendar-entry.model';

export const ALLOWED_SEARCH_TYPES = ['physicians', 'call-reference', 'or-reference'];


export interface SearchState {
  searchSchedule: AvailableMonthsStructure;
  searchType: string | null;
  searchEntryId: string | null;
  callReferenceLaborCodes: string[] | null;
  orReferenceLaborCodes: string[] | null;
  employeesInGroup: Employee[] | null;
  search: string;
  loading: boolean;
  viewType: CalendarTypes;
  selectedDate: Date;
}

const initialSearchState = {
  searchSchedule: {},
  searchType: null,
  searchEntryId: null,
  callReferenceLaborCodes: null,
  orReferenceLaborCodes: null,
  employeesInGroup: null,
  search: '',
  loading: false,
  viewType: CalendarTypes.DAY,
  selectedDate: new Date()
};


export function searchReducer(state: SearchState = initialSearchState, action: searchActions.Actions): SearchState {
  switch (action.type) {
    case searchActions.ActionTypes.CLEAN_SCHEDULE: {
      return _.cloneDeep(initialSearchState);
    }
    case searchActions.ActionTypes.LOAD_CALL_REFERENCE_SUCCESS: {
      return loadCallReferenceHandler(setNotLoadingHandler(state), action);
    }
    case searchActions.ActionTypes.LOAD_OR_REFERENCE_SUCCESS: {
      return loadOrReferenceHandler(setNotLoadingHandler(state), action);
    }
    case searchActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP_SUCCESS: {
      return loadEmployeesInGroupHandler(setNotLoadingHandler(state), action);
    }
    case searchActions.ActionTypes.SET_SEARCH_TYPE: {
      return setSearchTypeHandler(state, action);
    }
    case searchActions.ActionTypes.SET_SEARCH_TEXT: {
      return setSearchTextHandler(state, action);
    }
    case searchActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP:
    case searchActions.ActionTypes.LOAD_SEARCH_MONTH_SCHEDULE:
    case searchActions.ActionTypes.LOAD_SEARCH_FULL_SCHEDULE:
    case searchActions.ActionTypes.LOAD_CALL_REFERENCE:
    case searchActions.ActionTypes.LOAD_OR_REFERENCE: {
      return setLoadingHandler(state);
    }
    case searchActions.ActionTypes.LOAD_SEARCH_MONTH_SCHEDULE_FINALLY:
    case searchActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP_FAIL:
    case searchActions.ActionTypes.LOAD_CALL_REFERENCE_FAIL:
    case searchActions.ActionTypes.LOAD_OR_REFERENCE_FAIL: {
      return setNotLoadingHandler(state);
    }
    case searchActions.ActionTypes.SET_SEARCH_ENTRY_ID: {
      return setSearchEntryIdHandler(state, action);
    }
    case searchActions.ActionTypes.SET_SEARCH_VIEW_TYPE: {
      return setSearchViewTypeHandler(state, action);
    }
    case searchActions.ActionTypes.SET_SEARCH_SELECTED_DATE: {
      return setSearchSelectedDateHandler(state, action);
    }
    case searchActions.ActionTypes.LOAD_SEARCH_MONTH_SCHEDULE_SUCCESS: {
      return loadSearchMonthScheduleHandler(state, action);
    }
    case searchActions.ActionTypes.FILL_SEARCH_MONTH_SCHEDULE: {
      return fillSearchMonthScheduleHandler(state, action);
    }
    case searchActions.ActionTypes.CLEAN_SEARCH_MONTHS_SCHEDULE: {
      return cleanSearchMonthsHandler(state);
    }
    default: {
      return state;
    }
  }
}
/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
function setLoadingHandler(state: SearchState): SearchState {
  return _.assign({}, state, {
    loading: true
  });
}

function setNotLoadingHandler(state: SearchState): SearchState {
  return _.assign({}, state, {
    loading: false,
  });
}

function loadSearchMonthScheduleHandler(state: SearchState, action: searchActions.LoadSearchMonthScheduleSuccessAction): SearchState {
  if (!action.payload.loaded) {
    // error while loading
    return state;
  }
  let newState = _.cloneDeep(state);
  let loadedMonthWrapper = {};
  loadedMonthWrapper[`${action.payload.dateString}`] = Object.assign({}, action.payload);
  newState.searchSchedule = _.assign({}, newState.searchSchedule, loadedMonthWrapper);
  return newState;
}

function fillSearchMonthScheduleHandler(state: SearchState, action: searchActions.FillSearchMonthsScheduleAction): SearchState {
  let newMonths = false;
  let newSchedule = _.cloneDeep(state.searchSchedule);
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
    newState.searchSchedule = _.assign({}, newSchedule);
    return newState;
  } else {
    return state;
  }
}

function cleanSearchMonthsHandler(state: SearchState): SearchState {
  let newState = _.cloneDeep(state);
  newState.searchSchedule = {};
  return newState;
}

function setSearchTypeHandler(state: SearchState, action: searchActions.SetSearchType): SearchState {
  let newState = _.cloneDeep(state);
  if (action.payload !== newState.searchType) {
    newState.searchType = action.payload;
    newState.search = '';
    newState.viewType = CalendarTypes.DAY;
    newState.selectedDate = new Date();
    newState.searchSchedule = {};
  }
  return newState;
}

function loadCallReferenceHandler(state: SearchState, action: searchActions.LoadCallReferenceSuccessAction): SearchState {
  let newState = _.cloneDeep(state);
  newState.callReferenceLaborCodes = _.clone(action.payload);
  return newState;
}

function loadOrReferenceHandler(state: SearchState, action: searchActions.LoadOrReferenceSuccessAction): SearchState {
  let newState = _.cloneDeep(state);
  newState.orReferenceLaborCodes = _.clone(action.payload);
  return newState;
}

function loadEmployeesInGroupHandler(state: SearchState, action: searchActions.LoadEmployeesInGroupSuccessAction): SearchState {
  let newState = _.cloneDeep(state);
  newState.employeesInGroup = _.clone(action.payload);
  return newState;
}

function setSearchTextHandler(state: SearchState, action: searchActions.SetSearchTextAction): SearchState {
  let newState = _.cloneDeep(state);
  newState.search = action.payload;
  return newState;
}

function setSearchEntryIdHandler(state: SearchState, action: searchActions.SetSearchEntryIdAction): SearchState {
  let newState = _.cloneDeep(state);
  newState.searchEntryId = action.payload;
  return newState;
}

function setSearchViewTypeHandler(state: SearchState, action: searchActions.SetSearchViewTypeAction): SearchState {
  let newState = _.cloneDeep(state);
  newState.viewType = action.payload;
  return newState;
}

function setSearchSelectedDateHandler(state: SearchState, action: searchActions.SetSearchSelectedDateAction): SearchState {
  let newState = _.cloneDeep(state);
  newState.selectedDate = new Date(action.payload);
  return newState;
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getSearchType = (state: SearchState) => state.searchType;
export const getCallReferenceList = (state: SearchState) => state.callReferenceLaborCodes;
export const getOrReferenceList = (state: SearchState) => state.orReferenceLaborCodes;
export const getEmployeesInGroupList = (state: SearchState) => state.employeesInGroup;
export const getSearchText = (state: SearchState) => state.search;
export const getLoadingState = (state: SearchState) => state.loading;
export const getSearchEntryId = (state: SearchState) => state.searchEntryId;
export const getViewType = (state: SearchState) => state.viewType;
export const getSelectedDate = (state: SearchState) => state.selectedDate;
export const getSearchSchedule = (state: SearchState) => state.searchSchedule;

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

export const getEmployeeById = id => {
  return createSelector(
    getEmployeesInGroupList,
    (employees: Employee[]): Employee => {
      if (!employees) {
        return null;
      }
      return _.filter(employees, entry => entry.EmployeeID === id)[0];
    }
  );
};

export const getSelectedDateSchedule = createSelector(
  getSearchSchedule,
  getSelectedDate,
  getViewType,
  (schedule: AvailableMonthsStructure, date: Date, type: CalendarTypes): (EmployeeScheduleEntry | MasterCalendarEntry)[] | boolean => {
    let m = moment(date);
    let day = m.date();
    let month = m.month() + 1;
    let year = m.year();
    if (!schedule[`${year}.${month}`]) {
      return false;
    }
    switch (type) {
      case CalendarTypes.DAY: {
        return _.filter(schedule[`${year}.${month}`].entries, (scheduleEntry: EmployeeScheduleEntry | MasterCalendarEntry) => {
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
        let entries: (EmployeeScheduleEntry | MasterCalendarEntry)[] = [];
        if (start.isSame(end, 'month')) {
          if (!schedule[`${year}.${month}`].entries) {
            return false;
          }
          return _.filter(schedule[`${year}.${month}`].entries, (scheduleEntry: EmployeeScheduleEntry | MasterCalendarEntry) => {
            return scheduleEntry.Year === year &&
              scheduleEntry.Month === month &&
              scheduleEntry.Day >= start.date() &&
              scheduleEntry.Day <= end.date();
          });
        } else {
          let arr1 = schedule[`${start.year()}.${start.month() + 1}`] ?
            schedule[`${start.year()}.${start.month() + 1}`].entries :
            [];

          let arr2 = schedule[`${end.year()}.${end.month() + 1}`] ?
            schedule[`${end.year()}.${end.month() + 1}`].entries :
            [];

          entries = _(arr1).concat(arr2)
            .filter((scheduleEntry: EmployeeScheduleEntry | MasterCalendarEntry) => {
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
  (entries: (EmployeeScheduleEntry | MasterCalendarEntry)[]): (EmployeeScheduleEntry | MasterCalendarEntry)[] => {
    return _.sortBy(entries, entry => SORT_ORDER[entry.ShiftCode] || 10);
  }
);


export const getSelectedDateScheduleGroupedByDay = createSelector(
  getSelectedDateSchedule,
  (entries: (EmployeeScheduleEntry | MasterCalendarEntry)[]): EmployeeScheduleEntryGroupedByDay[] | boolean => {
    if (!entries) {
      return false;
    }
    let groupedEntries: {[key: string]: (EmployeeScheduleEntry | MasterCalendarEntry)[]} = {};
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
