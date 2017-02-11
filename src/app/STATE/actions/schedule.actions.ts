/**
 * Created by TrUnK on 20.01.2017.
 */
import { Action } from '@ngrx/store';

import { type } from '../utils';
import {GroupSchedule} from '../models/group-schedule.model';
import {LoadedMonth} from '../models/employee-schedule-entry.model';
import {CalendarTypes} from '../models/calendar.types';
import {QualifiedEmployee, Employee} from '../models/employee.model';
import {CoverageRequest} from '../models/requests/coverage-request.request.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {

// load group schedule months actions
  LOAD_GROUP_SCHEDULE_MONTHS: type('[Schedule] Load group schedule months'),
  LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS: type('[Schedule] Load group schedule months success'),
  LOAD_GROUP_SCHEDULE_MONTHS_FAIL: type('[Schedule] Load group schedule months fail'),

// load my month schedule months actions
  LOAD_MY_MONTH_SCHEDULE: type('[Schedule] Load my month schedule months'),
  LOAD_MY_FULL_SCHEDULE: type('[Schedule] Load my full schedule months'),
  LOAD_MY_MONTH_SCHEDULE_SUCCESS: type('[Schedule] Load my month schedule months success'),
  LOAD_MY_MONTH_SCHEDULE_FAIL: type('[Schedule] Load my month schedule months fail'),
  LOAD_MY_MONTH_SCHEDULE_FINALLY: type('[Schedule] Load my month schedule months finally'),

// Find Employees to cover shift actions
  LOAD_SHIFT_EMPLOYEES: type('[Schedule] Find employees to cover shift'),
  LOAD_SHIFT_EMPLOYEES_SUCCESS: type('[Schedule] Find employees to cover shift success'),
  LOAD_SHIFT_EMPLOYEES_FAIL: type('[Schedule] Find employees to cover shift fail'),
  CLEAN_SHIFT_EMPLOYEES: type('[Schedule] Clean Qualified Employees'),
  TOGGLE_SELECTION: type('[Schedule] Toggle employee selection'),
  REMOVE_UNSELECTED_SHIFT_EMPLOYEES: type('[Schedule] Remove unselected employees'),
  SET_EMPLOYEES_LOADING: type('[Schedule] Set loading status for employees'),

// Create coverage request
  CREATE_COVERAGE_REQUEST: type('[Schedule] Create coverage request'),
  CREATE_COVERAGE_REQUEST_SUCCESS: type('[Schedule] Create coverage request success'),
  CREATE_COVERAGE_REQUEST_FAIL: type('[Schedule] Create coverage request fail'),

// load call reference labors
  LOAD_CALL_REFERENCE: type('[Schedule] Load call reference labor'),
  LOAD_CALL_REFERENCE_SUCCESS: type('[Schedule] Load call reference labor success'),
  LOAD_CALL_REFERENCE_FAIL: type('[Schedule] Load call reference labor fail'),

// load OR reference labors
  LOAD_OR_REFERENCE: type('[Schedule] Load OR reference labor'),
  LOAD_OR_REFERENCE_SUCCESS: type('[Schedule] Load OR reference labor success'),
  LOAD_OR_REFERENCE_FAIL: type('[Schedule] Load OR reference labor fail'),

// load employees in group
  LOAD_EMPLOYEES_IN_GROUP: type('[Schedule] Load employees in  group'),
  LOAD_EMPLOYEES_IN_GROUP_SUCCESS: type('[Schedule] Load employees in  group success'),
  LOAD_EMPLOYEES_IN_GROUP_FAIL: type('[Schedule] Load employees in  group labor fail'),

// OTHERS
  SET_MY_SELECTED_DATE: type('[Schedule] Set my selected date'),
  SET_HOME_VIEW_TYPE: type('[Schedule] Set home view type'),
  CLEAN_SCHEDULE: type('[Schedule] Clean Schedule'),
  SET_SEARCH_TYPE: type('[Schedule] Set search type'),
  LOAD_SEARCH_REFERENCE: type('[Schedule] Load search reference')

};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

// load group schedule months actions
export class LoadGroupScheduleMonthsAction implements Action {
  type = ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS;
}
export class LoadGroupScheduleMonthsSuccessAction implements Action {
  type = ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS;
  constructor(public payload: GroupSchedule[]) { }
}
export class LoadGroupScheduleMonthsFailAction implements Action {
  type = ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_FAIL;
  constructor(public payload: string) { }
}

// load my month schedule months actions
export class LoadMyFullScheduleAction implements Action {
  type = ActionTypes.LOAD_MY_FULL_SCHEDULE;
}
export class LoadMyMonthScheduleAction implements Action {
  type = ActionTypes.LOAD_MY_MONTH_SCHEDULE;
  constructor(public payload: Date) { }
}
export class LoadMyMonthScheduleSuccessAction implements Action {
  type = ActionTypes.LOAD_MY_MONTH_SCHEDULE_SUCCESS;
  constructor(public payload: LoadedMonth) { }
}
export class LoadMyMonthScheduleFailAction implements Action {
  type = ActionTypes.LOAD_MY_MONTH_SCHEDULE_FAIL;
  constructor(public payload: string) { }
}
export class LoadMyMonthScheduleFinishedAction implements Action {
  type = ActionTypes.LOAD_MY_MONTH_SCHEDULE_FINALLY;
}

// Find Employees to cover shift actions
export class LoadShiftEmployeesAction implements Action {
  type = ActionTypes.LOAD_SHIFT_EMPLOYEES;
  constructor(public payload: number) { }
}
export class LoadShiftEmployeesSuccessAction implements Action {
  type = ActionTypes.LOAD_SHIFT_EMPLOYEES_SUCCESS;
  constructor(public payload: QualifiedEmployee[]) { }
}
export class LoadShiftEmployeesFailAction implements Action {
  type = ActionTypes.LOAD_SHIFT_EMPLOYEES_FAIL;
  constructor(public payload: string) { }
}
export class CleanShiftEmployeesAction implements Action {
  type = ActionTypes.CLEAN_SHIFT_EMPLOYEES;
}
export class ToggleSelectionAction implements Action {
  type = ActionTypes.TOGGLE_SELECTION;
  constructor(public payload: QualifiedEmployee) { }
}
export class RemoveUnselectedShiftEmployeesAction implements Action {
  type = ActionTypes.REMOVE_UNSELECTED_SHIFT_EMPLOYEES;
}
export class SetEmployeeLoading implements Action {
  type = ActionTypes.SET_EMPLOYEES_LOADING;
}

// Create coverage request
export class CreateCoverageRequestAction implements Action {
  type = ActionTypes.CREATE_COVERAGE_REQUEST;
  constructor(public payload: CoverageRequest) { }
}
export class CreateCoverageRequestSuccessAction implements Action {
  type = ActionTypes.CREATE_COVERAGE_REQUEST_SUCCESS;
}
export class CreateCoverageRequestFailAction implements Action {
  type = ActionTypes.CREATE_COVERAGE_REQUEST_FAIL;
  constructor(public payload: string ) { }
}

// load call reference labors
export class LoadCallReferenceAction implements Action {
  type = ActionTypes.LOAD_CALL_REFERENCE;
}
export class LoadCallReferenceSuccessAction implements Action {
  type = ActionTypes.LOAD_CALL_REFERENCE_SUCCESS;
  constructor(public payload: string[]) { }
}
export class LoadCallReferenceFailAction implements Action {
  type = ActionTypes.LOAD_CALL_REFERENCE_FAIL;
  constructor(public payload: string) { }
}

// load OR reference labors
export class LoadOrReferenceAction implements Action {
  type = ActionTypes.LOAD_OR_REFERENCE;
}
export class LoadOrReferenceSuccessAction implements Action {
  type = ActionTypes.LOAD_OR_REFERENCE_SUCCESS;
  constructor(public payload: string[]) { }
}
export class LoadOrReferenceFailAction implements Action {
  type = ActionTypes.LOAD_OR_REFERENCE_FAIL;
  constructor(public payload: string) { }
}

// load employees in group
export class LoadEmployeesInGroupAction implements Action {
  type = ActionTypes.LOAD_EMPLOYEES_IN_GROUP;
}
export class LoadEmployeesInGroupSuccessAction implements Action {
  type = ActionTypes.LOAD_EMPLOYEES_IN_GROUP_SUCCESS;
  constructor(public payload: Employee[]) { }
}
export class LoadEmployeesInGroupFailAction implements Action {
  type = ActionTypes.LOAD_EMPLOYEES_IN_GROUP_FAIL;
  constructor(public payload: string) { }
}

// OTHERS
export class SetMySelectedDateAction implements Action {
  type = ActionTypes.SET_MY_SELECTED_DATE;
  constructor(public payload: Date) { }
}
export class SetHomeViewTypeAction implements Action {
  type = ActionTypes.SET_HOME_VIEW_TYPE;
  constructor(public payload: CalendarTypes) { }
}
export class CleanScheduleAction implements Action {
  type = ActionTypes.CLEAN_SCHEDULE;
}
export class SetSearchType implements Action {
  type = ActionTypes.SET_SEARCH_TYPE;
  constructor(public payload: string | null) {}
}
export class LoadSearchReferenceAction implements Action {
  type = ActionTypes.LOAD_SEARCH_REFERENCE;
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
// load group schedule months actions
  = LoadGroupScheduleMonthsAction
  | LoadGroupScheduleMonthsSuccessAction
  | LoadGroupScheduleMonthsFailAction

// load my month schedule months actions
  | LoadMyFullScheduleAction
  | LoadMyMonthScheduleAction
  | LoadMyMonthScheduleSuccessAction
  | LoadMyMonthScheduleFailAction
  | LoadMyMonthScheduleFinishedAction

// Find Employees to cover shift actions
  | LoadShiftEmployeesAction
  | LoadShiftEmployeesSuccessAction
  | LoadShiftEmployeesFailAction
  | CleanShiftEmployeesAction
  | ToggleSelectionAction
  | RemoveUnselectedShiftEmployeesAction
  | SetEmployeeLoading

// Create coverage request
  | CreateCoverageRequestAction
  | CreateCoverageRequestSuccessAction
  | CreateCoverageRequestFailAction

// load call reference labors
  | LoadCallReferenceAction
  | LoadCallReferenceSuccessAction
  | LoadCallReferenceFailAction

// load OR reference labors
  | LoadOrReferenceAction
  | LoadOrReferenceSuccessAction
  | LoadOrReferenceFailAction

// load employees in group
  | LoadEmployeesInGroupAction
  | LoadEmployeesInGroupSuccessAction
  | LoadEmployeesInGroupFailAction

// OTHERS
  | SetMySelectedDateAction
  | SetHomeViewTypeAction
  | SetSearchType
  | CleanScheduleAction;
