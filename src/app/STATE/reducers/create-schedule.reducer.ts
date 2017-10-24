/**
 * Created by TrUnK on 12.02.2017.
 */
import * as searchActions from '../actions/search.actions';
import { CreateScheduleDetailsModel, CreateScheduleModel } from '../models/create-schedule.model';

export interface CreateScheduleState {
  allScheduleRequests: CreateScheduleModel[] | null;
  selectedScheduleRequestId: number | null;
  selectedScheduleRequestDetails: CreateScheduleDetailsModel | null;
}

const initialCreateScheduleState = {
  allScheduleRequests: null,
  selectedScheduleRequestId: null,
  selectedScheduleRequestDetails: null
};


export function createScheduleReducer(
  state: CreateScheduleState = initialCreateScheduleState,
  action: searchActions.Actions
): CreateScheduleState {
  switch (action.type) {
    // case searchActions.ActionTypes.CLEAN_SCHEDULE: {
    //   return _.cloneDeep(initialCreateScheduleState);
    // }
    // case searchActions.ActionTypes.SET_SEARCH_LOADING: {
    //   return setScheduleLoadingHandler(state, (action as searchActions.SetSearchLoadingAction).payload);
    // }
    // case searchActions.ActionTypes.LOAD_CALL_REFERENCE_SUCCESS: {
    //   return loadCallReferenceHandler(setNotLoadingHandler(state), (action as searchActions.LoadCallReferenceSuccessAction));
    // }
    // case searchActions.ActionTypes.LOAD_OR_REFERENCE_SUCCESS: {
    //   return loadOrReferenceHandler(setNotLoadingHandler(state), (action as searchActions.LoadCallReferenceSuccessAction));
    // }
    // case searchActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP_SUCCESS: {
    //   return loadEmployeesInGroupHandler(setNotLoadingHandler(state), (action as searchActions.LoadEmployeesInGroupSuccessAction));
    // }
    // case searchActions.ActionTypes.SET_SEARCH_TYPE: {
    //   return setSearchTypeHandler(state, (action as searchActions.SetSearchType));
    // }
    // case searchActions.ActionTypes.SET_SEARCH_TEXT: {
    //   return setSearchTextHandler(state, (action as searchActions.SetSearchTextAction));
    // }
    // case searchActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP:
    // case searchActions.ActionTypes.LOAD_SEARCH_MONTH_SCHEDULE:
    // case searchActions.ActionTypes.LOAD_SEARCH_FULL_SCHEDULE:
    // case searchActions.ActionTypes.LOAD_CALL_REFERENCE:
    // case searchActions.ActionTypes.LOAD_OR_REFERENCE: {
    //   return setLoadingHandler(state);
    // }
    // case searchActions.ActionTypes.LOAD_EMPLOYEES_IN_GROUP_FAIL:
    // case searchActions.ActionTypes.LOAD_CALL_REFERENCE_FAIL:
    // case searchActions.ActionTypes.LOAD_OR_REFERENCE_FAIL: {
    //   return setNotLoadingHandler(state);
    // }
    // case searchActions.ActionTypes.LOAD_SEARCH_MONTH_SCHEDULE_FINALLY: {
    //   return setScheduleLoadingHandler(state, false);
    // }
    // case searchActions.ActionTypes.SET_SEARCH_ENTRY_ID: {
    //   return setSearchEntryIdHandler(state, (action as searchActions.SetSearchEntryIdAction));
    // }
    // case searchActions.ActionTypes.SET_SEARCH_VIEW_TYPE: {
    //   return setSearchViewTypeHandler(state, (action as searchActions.SetSearchViewTypeAction));
    // }
    // case searchActions.ActionTypes.SET_SEARCH_SELECTED_DATE: {
    //   return setSearchSelectedDateHandler(state, (action as searchActions.SetSearchSelectedDateAction));
    // }
    // case searchActions.ActionTypes.LOAD_SEARCH_MONTH_SCHEDULE_SUCCESS: {
    //   return loadSearchMonthScheduleHandler(state, (action as searchActions.LoadSearchMonthScheduleSuccessAction));
    // }
    // case searchActions.ActionTypes.FILL_SEARCH_MONTH_SCHEDULE: {
    //   return fillSearchMonthScheduleHandler(state, (action as searchActions.FillSearchMonthsScheduleAction));
    // }
    // case searchActions.ActionTypes.CLEAN_SEARCH_MONTHS_SCHEDULE: {
    //   return cleanSearchMonthsHandler(state);
    // }
    default: {
      return state;
    }
  }
}
/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
// function setLoadingHandler(state: CreateScheduleState): CreateScheduleState {
//   return _.assign({}, state, {
//     loading: true
//   });
// }

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getAllScheduleRequests = (state: CreateScheduleState) => state.allScheduleRequests;
export const getSelectedScheduleRequest = (state: CreateScheduleState) => state.selectedScheduleRequestDetails;
export const getSelectedScheduleRequestId = (state: CreateScheduleState) => state.selectedScheduleRequestId;
