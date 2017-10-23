/**
 * Created by TrUnK on 16.01.2017.
 */
import { Action } from '@ngrx/store';

import { type } from '../utils';
import { GroupPosition } from '../models/group-position.model';
import { GroupSpecialization } from '../models/group-specialization.model';
import { Region } from '../models/region.model';
import { State } from '../models/state.model';
import { TimeZone } from '../models/time-zone.model';
import { ReferenceType } from '../models/reference-type.model';
import { EmployeeStatus } from '../models/employee-status.model';
import { CallUnavailabilityType } from '../models/call-unavailability-type.model';
import { CallNightType } from '../models/call-night-type.model';
import { ShiftType } from '../models/shift-type.model';
import { Hospital } from '../models/hospital.model';
import { HospitalistRoundingType } from '../models/hospitalist-rounding-type.model';
import { ScheduleRequestStatusType } from '../models/schedule-request-status.model';
import { VacationWindowType } from '../models/vacation-window-type.model';

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

  // Load states
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
  LOAD_EMPLOYEE_STATUSES_FAIL: type('[References] Load employee statuses fail'),

  // load call unavailability types
  LOAD_CALL_UNAVAILABILITY_TYPES: type('[References] load call unavailability types'),
  LOAD_CALL_UNAVAILABILITY_TYPES_SUCCESS: type('[References] load call unavailability types success'),
  LOAD_CALL_UNAVAILABILITY_TYPES_FAIL: type('[References] load call unavailability types fail'),

  // Load call night types
  LOAD_CALL_NIGHT_TYPES: type('[References] Load call night types'),
  LOAD_CALL_NIGHT_TYPES_SUCCESS: type('[References] Load call night types success'),
  LOAD_CALL_NIGHT_TYPES_FAIL: type('[References] Load call night types fail'),

  // Load hospitalist rounding types
  LOAD_HOSPITALIST_ROUNDING_TYPES: type('[References] Load hospitalist rounding types'),
  LOAD_HOSPITALIST_ROUNDING_TYPES_SUCCESS: type('[References] Load hospitalist rounding types success'),
  LOAD_HOSPITALIST_ROUNDING_TYPES_FAIL: type('[References] Load hospitalist rounding types fail'),

  // Load hospitals
  LOAD_HOSPITALS: type('[References] Load hospitals'),
  LOAD_HOSPITALS_SUCCESS: type('[References] Load hospitals success'),
  LOAD_HOSPITALS_FAIL: type('[References] Load hospitals fail'),

  // Load shift types
  LOAD_SHIFT_TYPES: type('[References] Load shift types'),
  LOAD_SHIFT_TYPES_SUCCESS: type('[References] Load shift types success'),
  LOAD_SHIFT_TYPES_FAIL: type('[References] Load shift types fail'),

  // Load schedule request status types
  LOAD_SCHEDULE_REQUEST_STATUS_TYPES: type('[References] Load schedule request status types'),
  LOAD_SCHEDULE_REQUEST_STATUS_TYPES_SUCCESS: type('[References] Load schedule request status types success'),
  LOAD_SCHEDULE_REQUEST_STATUS_TYPES_FAIL: type('[References] Load schedule request status types fail'),

  // Load vacation window types
  LOAD_VACATION_WINDOW_TYPES: type('[References] Load vacation window types'),
  LOAD_VACATION_WINDOW_TYPES_SUCCESS: type('[References] Load vacation window types success'),
  LOAD_VACATION_WINDOW_TYPES_FAIL: type('[References] Load vacation window types fail'),

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

  // Load states
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

// load call unavailability types
export class LoadCallUnavailabilityTypesAction implements Action {
  type = ActionTypes.LOAD_CALL_UNAVAILABILITY_TYPES;
}
export class LoadCallUnavailabilityTypesSuccessAction implements Action {
  type = ActionTypes.LOAD_CALL_UNAVAILABILITY_TYPES_SUCCESS;
  constructor(public payload: CallUnavailabilityType[]) { }
}
export class LoadCallUnavailabilityTypesFailAction implements Action {
  type = ActionTypes.LOAD_CALL_UNAVAILABILITY_TYPES_FAIL;
  constructor(public payload: string) { }
}

// Load call night types
export class LoadCallNightTypesAction implements Action {
  type = ActionTypes.LOAD_CALL_NIGHT_TYPES;
}
export class LoadCallNightTypesSuccessAction implements Action {
  type = ActionTypes.LOAD_CALL_NIGHT_TYPES_SUCCESS;
  constructor(public payload: CallNightType[]) { }
}
export class LoadCallNightTypesFailAction implements Action {
  type = ActionTypes.LOAD_CALL_NIGHT_TYPES_FAIL;
  constructor(public payload: string) { }
}

// Load hospitalist rounding types
export class LoadHospitalistRoundingTypesAction implements Action {
  type = ActionTypes.LOAD_HOSPITALIST_ROUNDING_TYPES;
}
export class LoadHospitalistRoundingTypesSuccessAction implements Action {
  type = ActionTypes.LOAD_HOSPITALIST_ROUNDING_TYPES_SUCCESS;
  constructor(public payload: HospitalistRoundingType[]) { }
}
export class LoadHospitalistRoundingTypesFailAction implements Action {
  type = ActionTypes.LOAD_HOSPITALIST_ROUNDING_TYPES_FAIL;
  constructor(public payload: string) { }
}

// Load hospitals
export class LoadHospitalsAction implements Action {
  type = ActionTypes.LOAD_HOSPITALS;
}
export class LoadHospitalsSuccessAction implements Action {
  type = ActionTypes.LOAD_HOSPITALS_SUCCESS;
  constructor(public payload: Hospital[]) { }
}
export class LoadHospitalsFailAction implements Action {
  type = ActionTypes.LOAD_HOSPITALS_FAIL;
  constructor(public payload: string) { }
}

// Load shift types
export class LoadShiftTypesAction implements Action {
  type = ActionTypes.LOAD_SHIFT_TYPES;
}
export class LoadShiftTypesSuccessAction implements Action {
  type = ActionTypes.LOAD_SHIFT_TYPES_SUCCESS;
  constructor(public payload: ShiftType[]) { }
}
export class LoadShiftTypesFailAction implements Action {
  type = ActionTypes.LOAD_SHIFT_TYPES_FAIL;
  constructor(public payload: string) { }
}

// Load schedule request status types
export class LoadScheduleRequestStatusTypesAction implements Action {
  type = ActionTypes.LOAD_SCHEDULE_REQUEST_STATUS_TYPES;
}
export class LoadScheduleRequestStatusTypesSuccessAction implements Action {
  type = ActionTypes.LOAD_SCHEDULE_REQUEST_STATUS_TYPES_SUCCESS;
  constructor(public payload: ScheduleRequestStatusType[]) { }
}
export class LoadScheduleRequestStatusTypesFailAction implements Action {
  type = ActionTypes.LOAD_SCHEDULE_REQUEST_STATUS_TYPES_FAIL;
  constructor(public payload: string) { }
}

// Load vacation window types
export class LoadVacationWindowTypesAction implements Action {
  type = ActionTypes.LOAD_VACATION_WINDOW_TYPES;
}
export class LoadVacationWindowTypesSuccessAction implements Action {
  type = ActionTypes.LOAD_VACATION_WINDOW_TYPES_SUCCESS;
  constructor(public payload: VacationWindowType[]) { }
}
export class LoadVacationWindowTypesFailAction implements Action {
  type = ActionTypes.LOAD_VACATION_WINDOW_TYPES_FAIL;
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

// Load states
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

// load call unavailability types
  | LoadCallUnavailabilityTypesAction
  | LoadCallUnavailabilityTypesSuccessAction
  | LoadCallUnavailabilityTypesFailAction

// Load call night types
  | LoadCallNightTypesAction
  | LoadCallNightTypesSuccessAction
  | LoadCallNightTypesFailAction

// Load hospitalist rounding types
  | LoadHospitalistRoundingTypesAction
  | LoadHospitalistRoundingTypesSuccessAction
  | LoadHospitalistRoundingTypesFailAction

// Load hospitals
  | LoadHospitalsAction
  | LoadHospitalsSuccessAction
  | LoadHospitalsFailAction

// Load shift types
  | LoadShiftTypesAction
  | LoadShiftTypesSuccessAction
  | LoadShiftTypesFailAction

// Load schedule request status types
  | LoadScheduleRequestStatusTypesAction
  | LoadScheduleRequestStatusTypesSuccessAction
  | LoadScheduleRequestStatusTypesFailAction

// Load vacation window types
  | LoadVacationWindowTypesAction
  | LoadVacationWindowTypesSuccessAction
  | LoadVacationWindowTypesFailAction

// employeeStatuses actions
  | LoadEmployeeStatusesAction
  | LoadEmployeeStatusesSuccessAction
  | LoadEmployeeStatusesFailAction;
