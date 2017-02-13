/**
 * Created by TrUnK on 20.01.2017.
 */
import { Action } from '@ngrx/store';

import { type } from '../utils';
import {GroupSchedule} from '../models/group-schedule.model';

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

// OTHERS
  CLEAN_SCHEDULE: type('[Schedule] Clean Schedule')

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

// OTHERS
export class CleanScheduleAction implements Action {
  type = ActionTypes.CLEAN_SCHEDULE;
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

// OTHERS
  | CleanScheduleAction;
