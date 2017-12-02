/**
 * Created by TrUnK on 12.02.2017.
 */
import { Action } from '@ngrx/store';

import { type } from '../utils';
import { CreateScheduleDetailsModel, CreateScheduleModel } from '../models/create-schedule.model';
import {
  CreatePreferredOffWeekendRequest,
  CreateVolunteerShiftRequest,
  SubmitCallNightsRequest,
  SubmitCallUnavailabilityWindowRequest,
  SubmitEducationLeavesRequest,
  SubmitHospiralistRoundingRequest,
  SubmitVacationWindowRequest,
  UpdateScheduleRequestEmployeeNotesRequest,
  UpdateScheduleRequestUseCompTimeRequest
} from '../models/requests/create-schedule-request.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {

  // load all schedule requests
  LOAD_ALL_SCHEDULE_REQUESTS: type('[Create Schedule] load all schedule requests'),
  LOAD_ALL_SCHEDULE_REQUESTS_SUCCESS: type('[Create Schedule] load all schedule requests success'),
  LOAD_ALL_SCHEDULE_REQUESTS_FAIL: type('[Create Schedule] load all schedule requests fail'),

  // load schedule request
  LOAD_SCHEDULE_REQUEST: type('[Create Schedule] load schedule request'),
  LOAD_SCHEDULE_REQUEST_SUCCESS: type('[Create Schedule] load schedule request success'),
  LOAD_SCHEDULE_REQUEST_FAIL: type('[Create Schedule] load schedule request fail'),

  // submit vacation window
  SUBMIT_VACATION_WINDOW: type('[Create Schedule] submit vacation window'),
  SUBMIT_VACATION_WINDOW_SUCCESS: type('[Create Schedule] submit vacation window success'),
  SUBMIT_VACATION_WINDOW_FAIL: type('[Create Schedule] submit vacation window fail'),

  // submit call unavailability window
  SUBMIT_CALL_UNAVAILABILITY_WINDOW: type('[Create Schedule] submit call unavailability window'),
  SUBMIT_CALL_UNAVAILABILITY_WINDOW_SUCCESS: type('[Create Schedule] submit call unavailability window success'),
  SUBMIT_CALL_UNAVAILABILITY_WINDOW_FAIL: type('[Create Schedule] submit call unavailability window fail'),

  // submit education leaves
  SUBMIT_EDUCATION_LEAVES: type('[Create Schedule] submit education leaves'),
  SUBMIT_EDUCATION_LEAVES_SUCCESS: type('[Create Schedule] submit education leaves success'),
  SUBMIT_EDUCATION_LEAVES_FAIL: type('[Create Schedule] submit education leaves fail'),

  // submit call nights
  SUBMIT_CALL_NIGHTS: type('[Create Schedule] submit call nights'),
  SUBMIT_CALL_NIGHTS_SUCCESS: type('[Create Schedule] submit call nights success'),
  SUBMIT_CALL_NIGHTS_FAIL: type('[Create Schedule] submit call nights fail'),

  // submit off weekends
  SUBMIT_OFF_WEEKENDS: type('[Create Schedule] submit off weekends'),
  SUBMIT_OFF_WEEKENDS_SUCCESS: type('[Create Schedule] submit off weekends success'),
  SUBMIT_OFF_WEEKENDS_FAIL: type('[Create Schedule] submit off weekends fail'),

  // submit hospital roundings
  SUBMIT_HOSPITALIST_ROUNDINGS: type('[Create Schedule] submit hospital roundings'),
  SUBMIT_HOSPITALIST_ROUNDINGS_SUCCESS: type('[Create Schedule] submit hospital roundings success'),
  SUBMIT_HOSPITALIST_ROUNDINGS_FAIL: type('[Create Schedule] submit hospital roundings fail'),

  // submit volunteer shift
  SUBMIT_VOLUNTEER_SHIFT: type('[Create Schedule] submit volunteer shift'),
  SUBMIT_VOLUNTEER_SHIFT_SUCCESS: type('[Create Schedule] submit volunteer shift success'),
  SUBMIT_VOLUNTEER_SHIFT_FAIL: type('[Create Schedule] submit volunteer shift fail'),

  // update schedule request employee notes
  UPDATE_SR_EMPLOYEE_NOTES: type('[Create Schedule] update schedule request employee notes'),
  UPDATE_SR_EMPLOYEE_NOTES_SUCCESS: type('[Create Schedule] update schedule request employee notes success'),
  UPDATE_SR_EMPLOYEE_NOTES_FAIL: type('[Create Schedule] update schedule request employee notes fail'),

  // update schedule request use comp time
  UPDATE_SR_USE_COMP_TIME: type('[Create Schedule] update schedule request use comp time'),
  UPDATE_SR_USE_COMP_TIME_SUCCESS: type('[Create Schedule] update schedule request use comp time success'),
  UPDATE_SR_USE_COMP_TIME_FAIL: type('[Create Schedule] update schedule request use comp time fail'),

  // OTHER
  SET_SELECTED_SCHEDULE_REQUEST_ID: type('[Create Schedule] set selected schedule request id'),

};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

// load all schedule requests
export class LoadAllScheduleRequestsAction implements Action {
  type = ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS;
}
export class LoadAllScheduleRequestsSuccessAction implements Action {
  type = ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS_SUCCESS;
  constructor(public payload: CreateScheduleModel[]) { }
}
export class LoadAllScheduleRequestsFailAction implements Action {
  type = ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS_FAIL;
  constructor(public payload: string) { }
}

  // load schedule request
export class LoadScheduleRequestAction implements Action {
  type = ActionTypes.LOAD_SCHEDULE_REQUEST;
  constructor(public payload: number) { }
}
export class LoadScheduleRequestSuccessAction implements Action {
  type = ActionTypes.LOAD_SCHEDULE_REQUEST_SUCCESS;
  constructor(public payload: CreateScheduleDetailsModel) { }
}
export class LoadScheduleRequestFailAction implements Action {
  type = ActionTypes.LOAD_SCHEDULE_REQUEST_FAIL;
  constructor(public payload: string) { }
}

  // submit vacation window
export class SubmitVacationWindowAction implements Action {
  type = ActionTypes.SUBMIT_VACATION_WINDOW;
  constructor(public payload: SubmitVacationWindowRequest) { }
}
export class SubmitVacationWindowSuccessAction implements Action {
  type = ActionTypes.SUBMIT_VACATION_WINDOW_SUCCESS;
}
export class SubmitVacationWindowFailAction implements Action {
  type = ActionTypes.SUBMIT_VACATION_WINDOW_FAIL;
  constructor(public payload: string) { }
}

// submit call unavailability window
export class SubmitCallUnavailabilityWindowAction implements Action {
  type = ActionTypes.SUBMIT_CALL_UNAVAILABILITY_WINDOW;
  constructor(public payload: SubmitCallUnavailabilityWindowRequest) { }
}
export class SubmitCallUnavailabilityWindowSuccessAction implements Action {
  type = ActionTypes.SUBMIT_CALL_UNAVAILABILITY_WINDOW_SUCCESS;
}
export class SubmitCallUnavailabilityWindowFailAction implements Action {
  type = ActionTypes.SUBMIT_CALL_UNAVAILABILITY_WINDOW_FAIL;
  constructor(public payload: string) { }
}

// submit education leaves
export class SubmitEducationLeavesAction implements Action {
  type = ActionTypes.SUBMIT_EDUCATION_LEAVES;
  constructor(public payload: SubmitEducationLeavesRequest) { }
}
export class SubmitEducationLeavesSuccessAction implements Action {
  type = ActionTypes.SUBMIT_EDUCATION_LEAVES_SUCCESS;
}
export class SubmitEducationLeavesFailAction implements Action {
  type = ActionTypes.SUBMIT_EDUCATION_LEAVES_FAIL;
  constructor(public payload: string) { }
}

// submit call nights
export class SubmitCallNightsAction implements Action {
  type = ActionTypes.SUBMIT_CALL_NIGHTS;
  constructor(public payload: SubmitCallNightsRequest) { }
}
export class SubmitCallNightsSuccessAction implements Action {
  type = ActionTypes.SUBMIT_CALL_NIGHTS_SUCCESS;
}
export class SubmitCallNightsFailAction implements Action {
  type = ActionTypes.SUBMIT_CALL_NIGHTS_FAIL;
  constructor(public payload: string) { }
}

// submit off weekends
export class SubmitOffWeekendsAction implements Action {
  type = ActionTypes.SUBMIT_OFF_WEEKENDS;
  constructor(public payload: CreatePreferredOffWeekendRequest) { }
}
export class SubmitOffWeekendsSuccessAction implements Action {
  type = ActionTypes.SUBMIT_OFF_WEEKENDS_SUCCESS;
}
export class SubmitOffWeekendsFailAction implements Action {
  type = ActionTypes.SUBMIT_OFF_WEEKENDS_FAIL;
  constructor(public payload: string) { }
}

// submit hospital roundings
export class SubmitHospitalistRoundingsAction implements Action {
  type = ActionTypes.SUBMIT_HOSPITALIST_ROUNDINGS;
  constructor(public payload: SubmitHospiralistRoundingRequest) { }
}
export class SubmitHospitalistRoundingsSuccessAction implements Action {
  type = ActionTypes.SUBMIT_HOSPITALIST_ROUNDINGS_SUCCESS;
}
export class SubmitHospitalistRoundingsFailAction implements Action {
  type = ActionTypes.SUBMIT_HOSPITALIST_ROUNDINGS_FAIL;
  constructor(public payload: string) { }
}

// submit volunteer shift
export class SubmitVolunteerShiftAction implements Action {
  type = ActionTypes.SUBMIT_VOLUNTEER_SHIFT;
  constructor(public payload: CreateVolunteerShiftRequest) { }
}
export class SubmitVolunteerShiftSuccessAction implements Action {
  type = ActionTypes.SUBMIT_VOLUNTEER_SHIFT_SUCCESS;
}
export class SubmitVolunteerShiftFailAction implements Action {
  type = ActionTypes.SUBMIT_VOLUNTEER_SHIFT_FAIL;
  constructor(public payload: string) { }
}

  // update schedule request employee notes
export class UpdateSREmployeeNotesAction implements Action {
  type = ActionTypes.UPDATE_SR_EMPLOYEE_NOTES;
  constructor(public payload: UpdateScheduleRequestEmployeeNotesRequest) { }
}
export class UpdateSREmployeeNotesSuccessAction implements Action {
  type = ActionTypes.UPDATE_SR_EMPLOYEE_NOTES_SUCCESS;
}
export class UpdateSREmployeeNotesFailAction implements Action {
  type = ActionTypes.UPDATE_SR_EMPLOYEE_NOTES_FAIL;
  constructor(public payload: string) { }
}

  // update schedule request use comp time
export class UpdateSRUseCompTimeAction implements Action {
  type = ActionTypes.UPDATE_SR_USE_COMP_TIME;
  constructor(public payload: UpdateScheduleRequestUseCompTimeRequest) { }
}
export class UpdateSRUseCompTimeSuccessAction implements Action {
  type = ActionTypes.UPDATE_SR_USE_COMP_TIME_SUCCESS;
}
export class UpdateSRUseCompTimeFailAction implements Action {
  type = ActionTypes.UPDATE_SR_USE_COMP_TIME_FAIL;
  constructor(public payload: string) { }
}

// OTHER
export class SetSelectedScheduleRequestIdAction implements Action {
  type = ActionTypes.SET_SELECTED_SCHEDULE_REQUEST_ID;
  constructor(public payload: number) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions

// load all schedule requests
  = LoadAllScheduleRequestsAction
  | LoadAllScheduleRequestsSuccessAction
  | LoadAllScheduleRequestsFailAction


// load schedule request
  | LoadScheduleRequestAction
  | LoadScheduleRequestSuccessAction
  | LoadScheduleRequestFailAction

  // submit vacation window
  | SubmitVacationWindowAction
  | SubmitVacationWindowSuccessAction
  | SubmitVacationWindowFailAction

  // submit call unavailability window
  | SubmitCallUnavailabilityWindowAction
  | SubmitCallUnavailabilityWindowSuccessAction
  | SubmitCallUnavailabilityWindowFailAction

  // submit education leaves
  | SubmitEducationLeavesAction
  | SubmitEducationLeavesSuccessAction
  | SubmitEducationLeavesFailAction

  // submit call nights
  | SubmitCallNightsAction
  | SubmitCallNightsSuccessAction
  | SubmitCallNightsFailAction

  // submit off weekends
  | SubmitOffWeekendsAction
  | SubmitOffWeekendsSuccessAction
  | SubmitOffWeekendsFailAction

  // submit hospital roundings
  | SubmitHospitalistRoundingsAction
  | SubmitHospitalistRoundingsSuccessAction
  | SubmitHospitalistRoundingsFailAction

  // submit volunteer shift
  | SubmitVolunteerShiftAction
  | SubmitVolunteerShiftSuccessAction
  | SubmitVolunteerShiftFailAction

  // update schedule request employee notes
  | UpdateSREmployeeNotesAction
  | UpdateSREmployeeNotesSuccessAction
  | UpdateSREmployeeNotesFailAction

  // update schedule request use comp time
  | UpdateSRUseCompTimeAction
  | UpdateSRUseCompTimeSuccessAction
  | UpdateSRUseCompTimeFailAction

  // OTHER
  | SetSelectedScheduleRequestIdAction
  ;

