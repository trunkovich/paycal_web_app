/**
 * Created by TrUnK on 12.02.2017.
 */
import * as moment from 'moment';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

import * as searchActions from '../actions/search.actions';
import {Employee} from '../models/employee.model';
import {SearchResults} from '../models/search-results.model';

export const ALLOWED_SEARCH_TYPES = ['physicians', 'call-reference', 'or-reference'];


export interface SearchState {
  searchType: string | null;
  callReferenceLaborCodes: string[];
  orReferenceLaborCodes: string[];
  employeesInGroup: Employee[];
  search: string;
  loading: boolean;
}

const initialSearchState = {
  searchType: null,
  callReferenceLaborCodes: null,
  orReferenceLaborCodes: null,
  employeesInGroup: null,
  search: '',
  loading: false
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
    case searchActions.ActionTypes.LOAD_CALL_REFERENCE:
    case searchActions.ActionTypes.LOAD_OR_REFERENCE: {
      return setLoadingHandler(state);
    }
    case searchActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP_FAIL:
    case searchActions.ActionTypes.LOAD_CALL_REFERENCE_FAIL:
    case searchActions.ActionTypes.LOAD_OR_REFERENCE_FAIL: {
      return setNotLoadingHandler(state);
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

function setSearchTypeHandler(state: SearchState, action: searchActions.SetSearchType): SearchState {
  let newState = _.cloneDeep(state);
  if (action.payload !== newState.searchType) {
    newState.searchType = action.payload;
    newState.search = '';
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
  newState.search = _.clone(action.payload);
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
