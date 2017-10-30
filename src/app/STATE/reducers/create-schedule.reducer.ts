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
    case createScheduleActions.ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS:
    case createScheduleActions.ActionTypes.LOAD_SCHEDULE_REQUEST: {
      return setLoadingHandler(state, true);
    }
    case createScheduleActions.ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS_FAIL:
    case createScheduleActions.ActionTypes.LOAD_SCHEDULE_REQUEST_FAIL: {
      return setLoadingHandler(state, false);
    }
    case createScheduleActions.ActionTypes.LOAD_ALL_SCHEDULE_REQUESTS_SUCCESS: {
      return loadAllRequestsHandler(state, (action as createScheduleActions.LoadAllScheduleRequestsSuccessAction));
    }
    case createScheduleActions.ActionTypes.LOAD_SCHEDULE_REQUEST_SUCCESS: {
      return loadRequestHandler(state, (action as createScheduleActions.LoadScheduleRequestSuccessAction));
    }
    case createScheduleActions.ActionTypes.SET_SELECTED_SCHEDULE_REQUEST_ID: {
      return setSelectedIdHandler(state, (action as createScheduleActions.SetSelectedScheduleRequestIdAction));
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

function loadAllRequestsHandler(
  state: CreateScheduleState,
  action: createScheduleActions.LoadAllScheduleRequestsSuccessAction
): CreateScheduleState {
  return _.assign({}, state, {
    allScheduleRequests: _.cloneDeep(action.payload),
    loading: false
  });
}

function loadRequestHandler(
  state: CreateScheduleState,
  action: createScheduleActions.LoadScheduleRequestSuccessAction
): CreateScheduleState {
  return _.assign({}, state, {
    selectedScheduleRequestDetails: _.cloneDeep(action.payload),
    loading: false
  });
}

function setSelectedIdHandler(
  state: CreateScheduleState,
  action: createScheduleActions.SetSelectedScheduleRequestIdAction
): CreateScheduleState {
  return _.assign<CreateScheduleState>({}, state, {
    selectedScheduleRequestId: action.payload,
  });
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getLoading = (state: CreateScheduleState) => state.loading;
export const getAllScheduleRequests = (state: CreateScheduleState) => state.allScheduleRequests;
export const getSelectedScheduleRequest = (state: CreateScheduleState) => state.selectedScheduleRequestDetails;
export const getSelectedScheduleRequestId = (state: CreateScheduleState) => state.selectedScheduleRequestId;
