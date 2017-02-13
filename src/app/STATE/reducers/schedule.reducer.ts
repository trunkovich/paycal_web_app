/**
 * Created by TrUnK on 16.01.2017.
 */
import * as _ from 'lodash';

import * as scheduleActions from '../actions/schedule.actions';
import {GroupSchedule} from '../models/group-schedule.model';

export const ALLOWED_SEARCH_TYPES = ['physicians', 'call-reference', 'or-reference'];


export interface ScheduleState {
  groupScheduleMonths: GroupSchedule[];
  loading: boolean;
}

const initialScheduleState = {
  groupScheduleMonths: [],
  loading: false
};


export function scheduleReducer(state: ScheduleState = initialScheduleState, action: scheduleActions.Actions): ScheduleState {
  switch (action.type) {
    case scheduleActions.ActionTypes.CLEAN_SCHEDULE: {
      return _.cloneDeep(initialScheduleState);
    }
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS: {
      return loadGroupScheduleMonthsHandler(setNotLoadingHandler(state), action);
    }
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS: {
      return setLoadingHandler(state);
    }
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_FAIL: {
      return setNotLoadingHandler(state);
    }
    default: {
      return state;
    }
  }
}
/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
function setLoadingHandler(state: ScheduleState): ScheduleState {
  return _.assign({}, state, {
    loading: true
  });
}

function setNotLoadingHandler(state: ScheduleState): ScheduleState {
  return _.assign({}, state, {
    loading: false,
  });
}

function loadGroupScheduleMonthsHandler(state: ScheduleState, action: scheduleActions.LoadGroupScheduleMonthsSuccessAction): ScheduleState {
  // let newMonths = false;
  // let newSchedule = _.cloneDeep(state.mySchedule);
  // _.each(action.payload, (scheduleMonth) => {
  //   if (!newSchedule[`${scheduleMonth.Year}.${scheduleMonth.Month}`]) {
  //     newMonths = true;
  //     newSchedule[`${scheduleMonth.Year}.${scheduleMonth.Month}`] = {
  //       dateString: `${scheduleMonth.Year}.${scheduleMonth.Month}`,
  //       loaded: false,
  //       entries: [],
  //       month: scheduleMonth.Month,
  //       year: scheduleMonth.Year
  //     };
  //   }
  // });

  let newState = _.cloneDeep(state);
  newState.groupScheduleMonths = _.cloneDeep(action.payload);
  // if (newMonths) {
  //   newState.mySchedule = _.assign({}, newSchedule);
  // }
  return newState;
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getScheduleMonths = (state: ScheduleState) => state.groupScheduleMonths;
