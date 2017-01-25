/**
 * Created by TrUnK on 20.01.2017.
 */
import { Action } from '@ngrx/store';

import { type } from '../utils';
import {GroupSchedule} from '../models/group-schedule.model';
import {EmployeeScheduleEntry, LoadedMonth} from '../models/employee-schedule-entry.model';
import {Observable} from 'rxjs';
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

// OTHERS
  SET_MY_SELECTED_DATE: type('[Schedule] Set my selected date'),
  SET_HOME_VIEW_TYPE: type('[Schedule] Set home view type')

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

// OTHERS
export class SetMySelectedDateAction implements Action {
  type = ActionTypes.SET_MY_SELECTED_DATE;
  constructor(public payload: Date) { }
}
export class SetHomeViewTypeAction implements Action {
  type = ActionTypes.SET_HOME_VIEW_TYPE;
  constructor(public payload: CalendarTypes) { }
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

// OTHERS
  | SetMySelectedDateAction
  | SetHomeViewTypeAction;
