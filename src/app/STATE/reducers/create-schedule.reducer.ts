/**
 * Created by TrUnK on 12.02.2017.
 */
import * as _ from 'lodash';

import * as createScheduleActions from '../actions/create-schedule.actions';
import { CreateScheduleDetailsModel, CreateScheduleModel } from '../models/create-schedule.model';

export interface CreateScheduleState {
  allScheduleRequests: CreateScheduleModel[] | null;
  selectedScheduleRequestId: number | null;
  selectedScheduleRequestDetails: CreateScheduleDetailsModel | null;
  loading: boolean;
}

const initialCreateScheduleState = {
  allScheduleRequests: null,
  selectedScheduleRequestId: null,
  selectedScheduleRequestDetails: null,
  loading: false
};


export function createScheduleReducer(
  state: CreateScheduleState = initialCreateScheduleState,
  action: createScheduleActions.Actions
): CreateScheduleState {
  switch (action.type) {
    case createScheduleActions.ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS: {
      return setLoadingHandler(state, true);
    }
    case createScheduleActions.ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS_FAIL: {
      return setLoadingHandler(state, false);
    }
    case createScheduleActions.ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS_SUCCESS: {
      return setLoadAllRequestsHandler(state, (action as createScheduleActions.LoadAllScheduleRequestsSuccessAction));
    }
    default: {
      return state;
    }
  }
}
/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
function setLoadingHandler(state: CreateScheduleState, status): CreateScheduleState {
  return _.assign({}, state, {
    loading: status
  });
}

function setLoadAllRequestsHandler(
  state: CreateScheduleState,
  action: createScheduleActions.LoadAllScheduleRequestsSuccessAction
): CreateScheduleState {
  return _.assign({}, state, {
    allScheduleRequests: _.cloneDeep(action.payload),
    loading: false
  });
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getLoading = (state: CreateScheduleState) => state.loading;
export const getAllScheduleRequests = (state: CreateScheduleState) => state.allScheduleRequests;
export const getSelectedScheduleRequest = (state: CreateScheduleState) => state.selectedScheduleRequestDetails;
export const getSelectedScheduleRequestId = (state: CreateScheduleState) => state.selectedScheduleRequestId;
