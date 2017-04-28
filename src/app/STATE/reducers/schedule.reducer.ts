/**
 * Created by TrUnK on 16.01.2017.
 */
import * as _ from 'lodash';

import * as scheduleActions from '../actions/schedule.actions';
import { GroupSchedule } from '../models/group-schedule.model';

export const ALLOWED_SEARCH_TYPES = ['physicians', 'call-reference', 'or-reference'];


export interface ScheduleState {
  groupScheduleMonths: GroupSchedule[];
  currentSection: string | null;
  loading: boolean;
}

const initialScheduleState = {
  groupScheduleMonths: [],
  currentSection: null,
  loading: false
};


export function scheduleReducer(state: ScheduleState = initialScheduleState, action: scheduleActions.Actions): ScheduleState {
  switch (action.type) {
    case scheduleActions.ActionTypes.CLEAN_SCHEDULE: {
      return _.cloneDeep(initialScheduleState);
    }
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_SUCCESS: {
      return loadGroupScheduleMonthsHandler(setNotLoadingHandler(state), (action as scheduleActions.LoadGroupScheduleMonthsSuccessAction));
    }
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS: {
      return setLoadingHandler(state);
    }
    case scheduleActions.ActionTypes.LOAD_GROUP_SCHEDULE_MONTHS_FAIL: {
      return setNotLoadingHandler(state);
    }
    case scheduleActions.ActionTypes.SET_CURRENT_SECTION: {
      return setCurrentSectionHandler(state, (action as scheduleActions.SetCurrentSectionAction));
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

function setCurrentSectionHandler(state: ScheduleState, action: scheduleActions.SetCurrentSectionAction): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.currentSection = action.payload;
  return newState;
}

function loadGroupScheduleMonthsHandler(state: ScheduleState, action: scheduleActions.LoadGroupScheduleMonthsSuccessAction): ScheduleState {
  let newState = _.cloneDeep(state);
  newState.groupScheduleMonths = _.cloneDeep(action.payload);
  return newState;
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getScheduleMonths = (state: ScheduleState) => state.groupScheduleMonths;
export const getCurrentSection = (state: ScheduleState) => state.currentSection;
