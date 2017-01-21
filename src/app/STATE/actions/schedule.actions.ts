/**
 * Created by TrUnK on 20.01.2017.
 */
import { Action } from '@ngrx/store';

import { type } from '../utils';
import {GroupSchedule} from '../models/group-schedule.model';
import {EmployeeScheduleEntry} from '../models/employee-schedule-entry.model';
import {Observable} from 'rxjs';

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
  LOAD_MY_MONTH_SCHEDULE_SUCCESS: type('[Schedule] Load my month schedule months success'),
  LOAD_MY_MONTH_SCHEDULE_FAIL: type('[Schedule] Load my month schedule months fail'),

// OTHERS
  SET_MY_SELECTED_DATE: type('[Schedule] Set my selected date')

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
export class LoadMyMonthScheduleAction implements Action {
  type = ActionTypes.LOAD_MY_MONTH_SCHEDULE;
  constructor(public payload: Observable<Date>) { }
}
export class LoadMyMonthScheduleSuccessAction implements Action {
  type = ActionTypes.LOAD_MY_MONTH_SCHEDULE_SUCCESS;
  constructor(public payload: EmployeeScheduleEntry[]) { }
}
export class LoadMyMonthScheduleFailAction implements Action {
  type = ActionTypes.LOAD_MY_MONTH_SCHEDULE_FAIL;
  constructor(public payload: string) { }
}

// OTHERS
export class SetMySelectedDateAction implements Action {
  type = ActionTypes.SET_MY_SELECTED_DATE;
  constructor(public payload: Date) { }
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
  | LoadMyMonthScheduleAction
  | LoadMyMonthScheduleSuccessAction
  | LoadMyMonthScheduleFailAction

// OTHERS
  | SetMySelectedDateAction;
