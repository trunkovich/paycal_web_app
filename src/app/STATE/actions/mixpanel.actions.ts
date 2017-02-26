/**
 * Created by TrUnK on 26.02.2017.
 */
import {Action} from '@ngrx/store';
import {type} from '../utils';
import {Employee} from '../models/employee.model';
import {CalendarTypes} from '../models/calendar.types';
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
  INIT_TRACKING: type('[Mixpanel] Init tracking after getting a profile'),
  ALIAS_TRACKING_USER: type('[Mixpanel] Alias user after complete registration'),
  TRACK_APP_LAUNCHED: type('[Mixpanel] Track app launched'),
  TRACK_HOME_VIEW_OPENED: type('[Mixpanel] Track home view opened'),
  TRACK_EMPLOYEES_REQUESTED: type('[Mixpanel] Track employees requested'),
  TRACK_MESSAGE_FEATURE_OPENED: type('[Mixpanel] Track message feature opened'),
  TRACK_SHIFT_COVERAGE_REQUESTED: type('[Mixpanel] Track shift coverage requested'),
  TRACK_CALL_US_CLICKED: type('[Mixpanel] Track call us clicked'),
  TRACK_EMAIL_US_CLICKED: type('[Mixpanel] Track email us clicked'),
  TRACK_REGISTRATION_FORM_LANDED: type('[Mixpanel] Track registration form landed'),
  TRACK_REGISTRATION_FORM_SUBMITTED: type('[Mixpanel] Track registration form submitted'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class InitTrackingAction implements Action {
  type = ActionTypes.INIT_TRACKING;
  constructor(public payload: Employee) { }
}

export class AliasTrackingUserAction implements Action {
  type = ActionTypes.ALIAS_TRACKING_USER;
  constructor(public payload: number) { }
}

export class TrackAppLaunchedAction implements Action {
  type = ActionTypes.TRACK_APP_LAUNCHED;
  constructor() { }
}

export class TrackHomeViewOpenedAction implements Action {
  type = ActionTypes.TRACK_HOME_VIEW_OPENED;
  constructor(public payload: CalendarTypes) { }
}

export class TrackEmployeesRequestedAction implements Action {
  type = ActionTypes.TRACK_EMPLOYEES_REQUESTED;
  constructor(public payload: number) { }
}

export class TrackMessageGeatureOpenedAction implements Action {
  type = ActionTypes.TRACK_MESSAGE_FEATURE_OPENED;
  constructor(public payload: number) { }
}

export class TrackShiftCoverageRequestedAction implements Action {
  type = ActionTypes.TRACK_SHIFT_COVERAGE_REQUESTED;
  constructor(public payload: CoverageRequest) { }
}

export class TrackCallUsClickedAction implements Action {
  type = ActionTypes.TRACK_CALL_US_CLICKED;
  constructor() { }
}

export class TrackEmailUsClickedAction implements Action {
  type = ActionTypes.TRACK_EMAIL_US_CLICKED;
  constructor() { }
}

export class TrackRegistrationFormLandedAction implements Action {
  type = ActionTypes.TRACK_REGISTRATION_FORM_LANDED;
  constructor() { }
}

export class TrackRegistrationFormSubmittedAction implements Action {
  type = ActionTypes.TRACK_REGISTRATION_FORM_SUBMITTED;
  constructor() { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = InitTrackingAction
  | AliasTrackingUserAction
  | TrackAppLaunchedAction
  | TrackHomeViewOpenedAction
  | TrackEmployeesRequestedAction
  | TrackMessageGeatureOpenedAction
  | TrackShiftCoverageRequestedAction
  | TrackCallUsClickedAction
  | TrackEmailUsClickedAction
  | TrackRegistrationFormLandedAction
  | TrackRegistrationFormSubmittedAction;
