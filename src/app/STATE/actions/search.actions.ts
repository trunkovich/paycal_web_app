/**
 * Created by TrUnK on 12.02.2017.
 */
import { Action } from '@ngrx/store';

import { type } from '../utils';
import {Employee} from '../models/employee.model';
import {CalendarTypes} from '../models/calendar.types';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {

// load call reference labors
  LOAD_CALL_REFERENCE: type('[Search] Load call reference labor'),
  LOAD_CALL_REFERENCE_SUCCESS: type('[Search] Load call reference labor success'),
  LOAD_CALL_REFERENCE_FAIL: type('[Search] Load call reference labor fail'),

// load OR reference labors
  LOAD_OR_REFERENCE: type('[Search] Load OR reference labor'),
  LOAD_OR_REFERENCE_SUCCESS: type('[Search] Load OR reference labor success'),
  LOAD_OR_REFERENCE_FAIL: type('[Search] Load OR reference labor fail'),

// load employees in group
  LOAD_EMPLOYEES_IN_GROUP: type('[Search] Load employees in  group'),
  LOAD_EMPLOYEES_IN_GROUP_SUCCESS: type('[Search] Load employees in  group success'),
  LOAD_EMPLOYEES_IN_GROUP_FAIL: type('[Search] Load employees in  group labor fail'),

// OTHERS
  SET_SEARCH_TYPE: type('[Search] Set search type'),
  SET_SEARCH_TEXT: type('[Search] Set search text'),
  SET_SEARCH_ENTRY_ID: type('[Search] Set search entry id'),
  LOAD_SEARCH_REFERENCE: type('[Search] Load search reference'),
  SET_SEARCH_VIEW_TYPE: type('[Search] Set search view type'),
  SET_SEARCH_SELECTED_DATE: type('[Search] Set search selected date'),
  CLEAN_SCHEDULE: type('[Search] Clean Schedule')

};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

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
export class SetSearchType implements Action {
  type = ActionTypes.SET_SEARCH_TYPE;
  constructor(public payload: string | null) {}
}
export class LoadSearchReferenceAction implements Action {
  type = ActionTypes.LOAD_SEARCH_REFERENCE;
}
export class SetSearchTextAction implements Action {
  type = ActionTypes.SET_SEARCH_TEXT;
  constructor(public payload: string) {}
}
export class CleanScheduleAction implements Action {
  type = ActionTypes.CLEAN_SCHEDULE;
}
export class SetSearchEntryIdAction implements Action {
  type = ActionTypes.SET_SEARCH_ENTRY_ID;
  constructor(public payload: string) {}
}
export class SetSearchViewTypeAction implements Action {
  type = ActionTypes.SET_SEARCH_VIEW_TYPE;
  constructor(public payload: CalendarTypes) {}
}
export class SetSearchSelectedDateAction implements Action {
  type = ActionTypes.SET_SEARCH_SELECTED_DATE;
  constructor(public payload: Date) {}
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions

// load call reference labors
  = LoadCallReferenceAction
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
  | SetSearchType
  | CleanScheduleAction
  | LoadSearchReferenceAction
  | SetSearchEntryIdAction
  | SetSearchViewTypeAction
  | SetSearchSelectedDateAction
  | SetSearchTextAction;
