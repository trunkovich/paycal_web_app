/**
 * Created by TrUnK on 16.01.2017.
 */
import { Action } from '@ngrx/store';

import { type } from '../utils';
import {GroupPosition} from '../models/group-position.model';
import {GroupSpecialization} from '../models/group-specialization.model';
import {Region} from '../models/region.model';
import {State} from '../models/state.model';
import {TimeZone} from '../models/time-zone.model';
import {ReferenceType} from '../models/reference-type.model';
import {EmployeeStatus} from '../models/employee-status.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {

  // groupPositions actions
  LOAD_GROUP_POSITIONS: type('[References] Load group positions'),
  LOAD_GROUP_POSITIONS_SUCCESS: type('[References] Load group positions success'),
  LOAD_GROUP_POSITIONS_FAIL: type('[References] Load group positions fail'),

  // groupSpecializations actions
  LOAD_GROUP_SPECIALIZATIONS: type('[References] Load group specializations'),
  LOAD_GROUP_SPECIALIZATIONS_SUCCESS: type('[References] Load group specializations success'),
  LOAD_GROUP_SPECIALIZATIONS_FAIL: type('[References] Load group specializations fail'),

  // regions actions
  LOAD_REGIONS: type('[References] Load regions'),
  LOAD_REGIONS_SUCCESS: type('[References] Load regions success'),
  LOAD_REGIONS_FAIL: type('[References] Load regions fail'),

  // states actions
  LOAD_STATES: type('[References] Load states'),
  LOAD_STATES_SUCCESS: type('[References] Load states success'),
  LOAD_STATES_FAIL: type('[References] Load states fail'),

  // timeZones actions
  LOAD_TIME_ZONES: type('[References] Load time zones'),
  LOAD_TIME_ZONES_SUCCESS: type('[References] Load time zones success'),
  LOAD_TIME_ZONES_FAIL: type('[References] Load time zones fail'),

  // referencesTypes actions
  LOAD_REFERENCES_TYPES: type('[References] Load references types'),
  LOAD_REFERENCES_TYPES_SUCCESS: type('[References] Load references types success'),
  LOAD_REFERENCES_TYPES_FAIL: type('[References] Load references types fail'),

  // employeeStatuses actions
  LOAD_EMPLOYEE_STATUSES: type('[References] Load employee statuses'),
  LOAD_EMPLOYEE_STATUSES_SUCCESS: type('[References] Load employee statuses success'),
  LOAD_EMPLOYEE_STATUSES_FAIL: type('[References] Load employee statuses fail')

};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

// groupPositions actions
export class LoadGroupPositionsAction implements Action {
  type = ActionTypes.LOAD_GROUP_POSITIONS;
  constructor(public payload: {groupId: number}) { }
}
export class LoadGroupPositionsSuccessAction implements Action {
  type = ActionTypes.LOAD_GROUP_POSITIONS_SUCCESS;
  constructor(public payload: GroupPosition[]) { }
}
export class LoadGroupPositionsFailAction implements Action {
  type = ActionTypes.LOAD_GROUP_POSITIONS_FAIL;
  constructor(public payload: string) { }
}

  // groupSpecializations actions
export class LoadGroupSpecializationsAction implements Action {
  type = ActionTypes.LOAD_GROUP_SPECIALIZATIONS;
  constructor(public payload: {groupId: number}) { }
}
export class LoadGroupSpecializationsSuccessAction implements Action {
  type = ActionTypes.LOAD_GROUP_SPECIALIZATIONS_SUCCESS;
  constructor(public payload: GroupSpecialization[]) { }
}
export class LoadGroupSpecializationsFailAction implements Action {
  type = ActionTypes.LOAD_GROUP_SPECIALIZATIONS_FAIL;
  constructor(public payload: string) { }
}

  // regions actions
export class LoadRegionsAction implements Action {
  type = ActionTypes.LOAD_REGIONS;
}
export class LoadRegionsSuccessAction implements Action {
  type = ActionTypes.LOAD_REGIONS_SUCCESS;
  constructor(public payload: Region[]) { }
}
export class LoadRegionsFailAction implements Action {
  type = ActionTypes.LOAD_REGIONS_FAIL;
  constructor(public payload: string) { }
}

  // states actions
export class LoadStatesAction implements Action {
  type = ActionTypes.LOAD_STATES;
}
export class LoadStatesSuccessAction implements Action {
  type = ActionTypes.LOAD_STATES_SUCCESS;
  constructor(public payload: State[]) { }
}
export class LoadStatesFailAction implements Action {
  type = ActionTypes.LOAD_STATES_FAIL;
  constructor(public payload: string) { }
}

  // timeZones actions
export class LoadTimeZonesAction implements Action {
  type = ActionTypes.LOAD_TIME_ZONES;
}
export class LoadTimeZonesSuccessAction implements Action {
  type = ActionTypes.LOAD_TIME_ZONES_SUCCESS;
  constructor(public payload: TimeZone[]) { }
}
export class LoadTimeZonesFailAction implements Action {
  type = ActionTypes.LOAD_TIME_ZONES_FAIL;
  constructor(public payload: string) { }
}

  // referencesTypes actions
export class LoadReferencesTypesAction implements Action {
  type = ActionTypes.LOAD_REFERENCES_TYPES;
}
export class LoadReferencesTypesSuccessAction implements Action {
  type = ActionTypes.LOAD_REFERENCES_TYPES_SUCCESS;
  constructor(public payload: ReferenceType[]) { }
}
export class LoadReferencesTypesFailAction implements Action {
  type = ActionTypes.LOAD_REFERENCES_TYPES_FAIL;
  constructor(public payload: string) { }
}

  // employeeStatuses actions
export class LoadEmployeeStatusesAction implements Action {
  type = ActionTypes.LOAD_EMPLOYEE_STATUSES;
}
export class LoadEmployeeStatusesSuccessAction implements Action {
  type = ActionTypes.LOAD_EMPLOYEE_STATUSES_SUCCESS;
  constructor(public payload: EmployeeStatus[]) { }
}
export class LoadEmployeeStatusesFailAction implements Action {
  type = ActionTypes.LOAD_EMPLOYEE_STATUSES_FAIL;
  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
// groupPositions actions
  = LoadGroupPositionsAction
  | LoadGroupPositionsSuccessAction
  | LoadGroupPositionsFailAction

// groupSpecializations actions
  | LoadGroupSpecializationsAction
  | LoadGroupSpecializationsSuccessAction
  | LoadGroupSpecializationsFailAction

// regions actions
  | LoadRegionsAction
  | LoadRegionsSuccessAction
  | LoadRegionsFailAction

// states actions
  | LoadStatesAction
  | LoadStatesSuccessAction
  | LoadStatesFailAction

// timeZones actions
  | LoadTimeZonesAction
  | LoadTimeZonesSuccessAction
  | LoadTimeZonesFailAction

// referencesTypes actions
  | LoadReferencesTypesAction
  | LoadReferencesTypesSuccessAction
  | LoadReferencesTypesFailAction

// employeeStatuses actions
  | LoadEmployeeStatusesAction
  | LoadEmployeeStatusesSuccessAction
  | LoadEmployeeStatusesFailAction;
