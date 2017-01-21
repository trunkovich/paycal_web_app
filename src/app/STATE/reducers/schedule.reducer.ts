/**
 * Created by TrUnK on 16.01.2017.
 */
import * as scheduleActions from '../actions/schedule.actions';
import {GroupSchedule} from '../models/group-schedule.model';
import {EmployeeScheduleEntry} from '../models/employee-schedule-entry.model';
import {CalendarTypes} from '../models/calendar.types';
import { createSelector } from 'reselect';

export interface ScheduleState {
  groupScheduleMonths: GroupSchedule[];
  myMonthSchedule: EmployeeScheduleEntry[];
  mySelectedDate: Date;
  homeViewType: CalendarTypes;
}

const initialScheduleState = {
  groupScheduleMonths: [],
  myMonthSchedule: [],
  mySelectedDate: new Date(),
  homeViewType: CalendarTypes.DAY
};

export function scheduleReducer(state: ScheduleState = initialScheduleState, action: scheduleActions.Actions): ScheduleState {
  switch (action.type) {
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS: {
      return {
        groupScheduleMonths: [...action.payload],
        myMonthSchedule: state.myMonthSchedule,
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType
      };
    }
    case scheduleActions.ActionTypes.LOAD_MY_MONTH_SCHEDULE_SUCCESS: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        myMonthSchedule: [...action.payload],
        mySelectedDate: state.mySelectedDate,
        homeViewType: state.homeViewType
      };
    }
    case scheduleActions.ActionTypes.SET_MY_SELECTED_DATE: {
      return {
        groupScheduleMonths: state.groupScheduleMonths,
        myMonthSchedule: state.myMonthSchedule,
        mySelectedDate: new Date(action.payload),
        homeViewType: state.homeViewType
      };
    }
    default: {
      return state;
    }
  }
}

export const getScheduleMonths = (state: ScheduleState) => state.groupScheduleMonths;
export const getMonthSchedule = (state: ScheduleState) => state.myMonthSchedule;
export const getMySelectedDate = (state: ScheduleState) => state.mySelectedDate;
export const getHomeViewType = (state: ScheduleState) => state.homeViewType;

export const getDailySchedule = createSelector(
  getMonthSchedule,
  getMySelectedDate,
  (scheduleEntries: EmployeeScheduleEntry[], date: Date) => {
    console.log('getDailySchedule');
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return scheduleEntries.filter(entry => entry.Year === year && entry.Month === month && entry.Day === day);
  }
);
