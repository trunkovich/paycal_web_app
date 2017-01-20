/**
 * Created by TrUnK on 16.01.2017.
 */
import * as scheduleActions from '../actions/schedule.actions';
import {GroupSchedule} from '../models/group-schedule.model';
import {EmployeeScheduleEntry} from '../models/employee-schedule-entry.model';

export interface ScheduleState {
  groupScheduleMonths: GroupSchedule[];
  myMonthSchedule: EmployeeScheduleEntry[];
}

const initialScheduleState = {
  groupScheduleMonths: [],
  myMonthSchedule: []
};

export function scheduleReducer(state: ScheduleState = initialScheduleState, action: scheduleActions.Actions): ScheduleState {
  switch (action.type) {
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS: {
      return {
        groupScheduleMonths: action.payload,
        myMonthSchedule: state.myMonthSchedule
      };
    }
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_SUCCESS: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        myMonthSchedule: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
