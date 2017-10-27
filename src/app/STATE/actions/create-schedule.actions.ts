/**
 * Created by TrUnK on 12.02.2017.
 */
import { Action } from '@ngrx/store';

import { type } from '../utils';
import { CreateScheduleDetailsModel, CreateScheduleModel } from '../models/create-schedule.model';
import {
  CreateCallUnavailabilityWindowRequest,
  CreateEducationalLeaveRequest,
  CreateHospitalRoundingRequest,
  CreatePreferredCallNightRequest,
  CreatePreferredOffWeekendRequest,
  CreateVacationWindowRequest,
  CreateVolunteerShiftRequest,
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

  // delete call unavailability windows
  DELETE_CALL_UNAVAILABILITY_WINDOWS: type('[Create Schedule] delete call unavailability windows'),
  DELETE_CALL_UNAVAILABILITY_WINDOWS_SUCCESS: type('[Create Schedule] delete call unavailability windows success'),
  DELETE_CALL_UNAVAILABILITY_WINDOWS_FAIL: type('[Create Schedule] delete call unavailability windows fail'),

  // delete preferred call nights
  DELETE_PREFERRED_CALL_NIGHTS: type('[Create Schedule] delete preferred call nights'),
  DELETE_PREFERRED_CALL_NIGHTS_SUCCESS: type('[Create Schedule] delete preferred call nights success'),
  DELETE_PREFERRED_CALL_NIGHTS_FAIL: type('[Create Schedule] delete preferred call nights fail'),

  // delete education leaves
  DELETE_EDUCATION_LEAVES: type('[Create Schedule] delete education leaves'),
  DELETE_EDUCATION_LEAVES_SUCCESS: type('[Create Schedule] delete education leaves success'),
  DELETE_EDUCATION_LEAVES_FAIL: type('[Create Schedule] delete education leaves fail'),

  // delete hospital roundings
  DELETE_HOSPITAL_ROUNDINGS: type('[Create Schedule] delete hospital roundings'),
  DELETE_HOSPITAL_ROUNDINGS_SUCCESS: type('[Create Schedule] delete hospital roundings success'),
  DELETE_HOSPITAL_ROUNDINGS_FAIL: type('[Create Schedule] delete hospital roundings fail'),

  // delete preferred off weekends
  DELETE_PREFERRED_OFF_WEEKENDS: type('[Create Schedule] delete preferred off weekends'),
  DELETE_PREFERRED_OFF_WEEKENDS_SUCCESS: type('[Create Schedule] delete preferred off weekends success'),
  DELETE_PREFERRED_OFF_WEEKENDS_FAIL: type('[Create Schedule] delete preferred off weekends fail'),

  // delete vacation windows
  DELETE_VACATION_WINDOWS: type('[Create Schedule] delete vacation windows'),
  DELETE_VACATION_WINDOWS_SUCCESS: type('[Create Schedule] delete vacation windows success'),
  DELETE_VACATION_WINDOWS_FAIL: type('[Create Schedule] delete vacation windows fail'),

  // delete volunteer shifts
  DELETE_VOLUNTEER_SHIFTS: type('[Create Schedule] delete volunteer shifts'),
  DELETE_VOLUNTEER_SHIFTS_SUCCESS: type('[Create Schedule] delete volunteer shifts success'),
  DELETE_VOLUNTEER_SHIFTS_FAIL: type('[Create Schedule] delete volunteer shifts fail'),

  // create call unavailability window
  CREATE_CALL_UNAVAILABILITY_WINDOW: type('[Create Schedule] create call unavailability window'),
  CREATE_CALL_UNAVAILABILITY_WINDOW_SUCCESS: type('[Create Schedule] create call unavailability window success'),
  CREATE_CALL_UNAVAILABILITY_WINDOW_FAIL: type('[Create Schedule] create call unavailability window fail'),

  // create educational leave
  CREATE_EDUCATIONAL_LEAVE: type('[Create Schedule] create educational leave'),
  CREATE_EDUCATIONAL_LEAVE_SUCCESS: type('[Create Schedule] create educational leave success'),
  CREATE_EDUCATIONAL_LEAVE_FAIL: type('[Create Schedule] create educational leave fail'),

  // create hospital rounding
  CREATE_HOSPITAL_ROUNDING: type('[Create Schedule] create hospital rounding'),
  CREATE_HOSPITAL_ROUNDING_SUCCESS: type('[Create Schedule] create hospital rounding success'),
  CREATE_HOSPITAL_ROUNDING_FAIL: type('[Create Schedule] create hospital rounding fail'),

  // create preferred call night
  CREATE_PREFERRED_CALL_NIGHT: type('[Create Schedule] create preferred call night'),
  CREATE_PREFERRED_CALL_NIGHT_SUCCESS: type('[Create Schedule] create preferred call night success'),
  CREATE_PREFERRED_CALL_NIGHT_FAIL: type('[Create Schedule] create preferred call night fail'),

  // create preferred off weekend
  CREATE_PREFERRED_OFF_WEEKEND: type('[Create Schedule] create preferred off weekend'),
  CREATE_PREFERRED_OFF_WEEKEND_SUCCESS: type('[Create Schedule] create preferred off weekend success'),
  CREATE_PREFERRED_OFF_WEEKEND_FAIL: type('[Create Schedule] create preferred off weekend fail'),

  // create vacation window
  CREATE_VACATION_WINDOW: type('[Create Schedule] create vacation window'),
  CREATE_VACATION_WINDOW_SUCCESS: type('[Create Schedule] create vacation window success'),
  CREATE_VACATION_WINDOW_FAIL: type('[Create Schedule] create vacation window fail'),

  // create volunteer shift
  CREATE_VOLUNTEER_SHIFT: type('[Create Schedule] create volunteer shift'),
  CREATE_VOLUNTEER_SHIFT_SUCCESS: type('[Create Schedule] create volunteer shift success'),
  CREATE_VOLUNTEER_SHIFT_FAIL: type('[Create Schedule] create volunteer shift fail'),

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

  // delete call unavailability windows
export class DeleteCallUnavailabilityWindowsAction implements Action {
  type = ActionTypes.DELETE_CALL_UNAVAILABILITY_WINDOWS;
  constructor(public payload: number) { }
}
export class DeleteCallUnavailabilityWindowsSuccessAction implements Action {
  type = ActionTypes.DELETE_CALL_UNAVAILABILITY_WINDOWS_SUCCESS;
}
export class DeleteCallUnavailabilityWindowsFailAction implements Action {
  type = ActionTypes.DELETE_CALL_UNAVAILABILITY_WINDOWS_FAIL;
  constructor(public payload: string) { }
}

  // delete preferred call nights
export class DeletePreferredCallNightsAction implements Action {
  type = ActionTypes.DELETE_PREFERRED_CALL_NIGHTS;
  constructor(public payload: number) { }
}
export class DeletePreferredCallNightsSuccessAction implements Action {
  type = ActionTypes.DELETE_PREFERRED_CALL_NIGHTS_SUCCESS;
}
export class DeletePreferredCallNightsFailAction implements Action {
  type = ActionTypes.DELETE_PREFERRED_CALL_NIGHTS_FAIL;
  constructor(public payload: string) { }
}

  // delete education leaves
export class DeleteEducationLeavesAction implements Action {
  type = ActionTypes.DELETE_EDUCATION_LEAVES;
  constructor(public payload: number) { }
}
export class DeleteEducationLeavesSuccessAction implements Action {
  type = ActionTypes.DELETE_EDUCATION_LEAVES_SUCCESS;
}
export class DeleteEducationLeavesFailAction implements Action {
  type = ActionTypes.DELETE_EDUCATION_LEAVES_FAIL;
  constructor(public payload: string) { }
}

  // delete hospital roundings
export class DeleteHospitalRoundingsAction implements Action {
  type = ActionTypes.DELETE_HOSPITAL_ROUNDINGS;
  constructor(public payload: number) { }
}
export class DeleteHospitalRoundingsSuccessAction implements Action {
  type = ActionTypes.DELETE_HOSPITAL_ROUNDINGS_SUCCESS;
}
export class DeleteHospitalRoundingsFailAction implements Action {
  type = ActionTypes.DELETE_HOSPITAL_ROUNDINGS_FAIL;
  constructor(public payload: string) { }
}

  // delete preferred off weekends
export class DeletePreferreOffWeekendsAction implements Action {
  type = ActionTypes.DELETE_PREFERRED_OFF_WEEKENDS;
  constructor(public payload: number) { }
}
export class DeletePreferreOffWeekendsSuccessAction implements Action {
  type = ActionTypes.DELETE_PREFERRED_OFF_WEEKENDS_SUCCESS;
}
export class DeletePreferreOffWeekendsFailAction implements Action {
  type = ActionTypes.DELETE_PREFERRED_OFF_WEEKENDS_FAIL;
  constructor(public payload: string) { }
}

  // delete vacation windows
export class DeleteVacationWindowsAction implements Action {
  type = ActionTypes.DELETE_VACATION_WINDOWS;
  constructor(public payload: number) { }
}
export class DeleteVacationWindowsSuccessAction implements Action {
  type = ActionTypes.DELETE_VACATION_WINDOWS_SUCCESS;
}
export class DeleteVacationWindowsFailAction implements Action {
  type = ActionTypes.DELETE_VACATION_WINDOWS_FAIL;
  constructor(public payload: string) { }
}

  // delete volunteer shifts
export class DeleteVolunteerShiftsAction implements Action {
  type = ActionTypes.DELETE_VOLUNTEER_SHIFTS;
  constructor(public payload: number) { }
}
export class DeleteVolunteerShiftsSuccessAction implements Action {
  type = ActionTypes.DELETE_VOLUNTEER_SHIFTS_SUCCESS;
}
export class DeleteVolunteerShiftsFailAction implements Action {
  type = ActionTypes.DELETE_VOLUNTEER_SHIFTS_FAIL;
  constructor(public payload: string) { }
}

  // create call unavailability window
export class CreateCallUnavailabilityWindowAction implements Action {
  type = ActionTypes.CREATE_CALL_UNAVAILABILITY_WINDOW;
  constructor(public payload: CreateCallUnavailabilityWindowRequest) { }
}
export class CreateCallUnavailabilityWindowSuccessAction implements Action {
  type = ActionTypes.CREATE_CALL_UNAVAILABILITY_WINDOW_SUCCESS;
}
export class CreateCallUnavailabilityWindowFailAction implements Action {
  type = ActionTypes.CREATE_CALL_UNAVAILABILITY_WINDOW_FAIL;
  constructor(public payload: string) { }
}

  // create educational leave
export class CreateEducationalLeaveAction implements Action {
  type = ActionTypes.CREATE_EDUCATIONAL_LEAVE;
  constructor(public payload: CreateEducationalLeaveRequest) { }
}
export class CreateEducationalLeaveSuccessAction implements Action {
  type = ActionTypes.CREATE_EDUCATIONAL_LEAVE_SUCCESS;
}
export class CreateEducationalLeaveFailAction implements Action {
  type = ActionTypes.CREATE_EDUCATIONAL_LEAVE_FAIL;
  constructor(public payload: string) { }
}

  // create hospital rounding
export class CreateHospitalRoundingAction implements Action {
  type = ActionTypes.CREATE_HOSPITAL_ROUNDING;
  constructor(public payload: CreateHospitalRoundingRequest) { }
}
export class CreateHospitalRoundingSuccessAction implements Action {
  type = ActionTypes.CREATE_HOSPITAL_ROUNDING_SUCCESS;
}
export class CreateHospitalRoundingFailAction implements Action {
  type = ActionTypes.CREATE_HOSPITAL_ROUNDING_FAIL;
  constructor(public payload: string) { }
}

  // create preferred call night
export class CreatePreferredCallNightAction implements Action {
  type = ActionTypes.CREATE_PREFERRED_CALL_NIGHT;
  constructor(public payload: CreatePreferredCallNightRequest) { }
}
export class CreatePreferredCallNightSuccessAction implements Action {
  type = ActionTypes.CREATE_PREFERRED_CALL_NIGHT_SUCCESS;
}
export class CreatePreferredCallNightFailAction implements Action {
  type = ActionTypes.CREATE_PREFERRED_CALL_NIGHT_FAIL;
  constructor(public payload: string) { }
}

  // create preferred off weekend
export class CreatePreferredOffWeekendAction implements Action {
  type = ActionTypes.CREATE_PREFERRED_OFF_WEEKEND;
  constructor(public payload: CreatePreferredOffWeekendRequest) { }
}
export class CreatePreferredOffWeekendSuccessAction implements Action {
  type = ActionTypes.CREATE_PREFERRED_OFF_WEEKEND_SUCCESS;
}
export class CreatePreferredOffWeekendFailAction implements Action {
  type = ActionTypes.CREATE_PREFERRED_OFF_WEEKEND_FAIL;
  constructor(public payload: string) { }
}

  // create vacation window
export class CreateVacationWindowAction implements Action {
  type = ActionTypes.CREATE_VACATION_WINDOW;
  constructor(public payload: CreateVacationWindowRequest) { }
}
export class CreateVacationWindowSuccessAction implements Action {
  type = ActionTypes.CREATE_VACATION_WINDOW_SUCCESS;
}
export class CreateVacationWindowFailAction implements Action {
  type = ActionTypes.CREATE_VACATION_WINDOW_FAIL;
  constructor(public payload: string) { }
}

  // create volunteer shift
export class CreateVolunteerShiftAction implements Action {
  type = ActionTypes.CREATE_VOLUNTEER_SHIFT;
  constructor(public payload: CreateVolunteerShiftRequest) { }
}
export class CreateVolunteerShiftSuccessAction implements Action {
  type = ActionTypes.CREATE_VOLUNTEER_SHIFT_SUCCESS;
}
export class CreateVolunteerShiftFailAction implements Action {
  type = ActionTypes.CREATE_VOLUNTEER_SHIFT_FAIL;
  constructor(public payload: string) { }
}

  // update schedule request employee notes
export class UpdateSREmployeeNotesAction implements Action {
  type = ActionTypes.UPDATE_SR_EMPLOYEE_NOTES;
  constructor(public payload: UpdateScheduleRequestUseCompTimeRequest) { }
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
  constructor(public payload: UpdateScheduleRequestEmployeeNotesRequest) { }
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

  // delete call unavailability windows
  | DeleteCallUnavailabilityWindowsAction
  | DeleteCallUnavailabilityWindowsSuccessAction
  | DeleteCallUnavailabilityWindowsFailAction

  // delete preferred call nights
  | DeletePreferredCallNightsAction
  | DeletePreferredCallNightsSuccessAction
  | DeletePreferredCallNightsFailAction

  // delete education leaves
  | DeleteEducationLeavesAction
  | DeleteEducationLeavesSuccessAction
  | DeleteEducationLeavesFailAction

  // delete hospital roundings
  | DeleteHospitalRoundingsAction
  | DeleteHospitalRoundingsSuccessAction
  | DeleteHospitalRoundingsFailAction

  // delete preferred off weekends
  | DeletePreferreOffWeekendsAction
  | DeletePreferreOffWeekendsSuccessAction
  | DeletePreferreOffWeekendsFailAction

  // delete vacation windows
  | DeleteVacationWindowsAction
  | DeleteVacationWindowsSuccessAction
  | DeleteVacationWindowsFailAction

  // delete volunteer shifts
  | DeleteVolunteerShiftsAction
  | DeleteVolunteerShiftsSuccessAction
  | DeleteVolunteerShiftsFailAction

  // create call unavailability window
  | CreateCallUnavailabilityWindowAction
  | CreateCallUnavailabilityWindowSuccessAction
  | CreateCallUnavailabilityWindowFailAction

  // create educational leave
  | CreateEducationalLeaveAction
  | CreateEducationalLeaveSuccessAction
  | CreateEducationalLeaveFailAction

  // create hospital rounding
  | CreateHospitalRoundingAction
  | CreateHospitalRoundingSuccessAction
  | CreateHospitalRoundingFailAction

  // create preferred call night
  | CreatePreferredCallNightAction
  | CreatePreferredCallNightSuccessAction
  | CreatePreferredCallNightFailAction

  // create preferred off weekend
  | CreatePreferredOffWeekendAction
  | CreatePreferredOffWeekendSuccessAction
  | CreatePreferredOffWeekendFailAction

  // create vacation window
  | CreateVacationWindowAction
  | CreateVacationWindowSuccessAction
  | CreateVacationWindowFailAction

  // create volunteer shift
  | CreateVolunteerShiftAction
  | CreateVolunteerShiftSuccessAction
  | CreateVolunteerShiftFailAction

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

