/**
 * Created by TrUnK on 21.01.2017.
 */
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromAuth from './auth.reducer';
import * as fromProfile from './profile.reducer';
import * as fromReferences from './references.reducer';
import * as fromSchedule from './schedule.reducer';
import * as fromDebug from './debug.reducer';
import {Employee} from '../models/employee.model';


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
  auth: fromAuth.AuthState;
  profile: fromProfile.ProfileState;
  references: fromReferences.ReferencesState;
  schedule: fromSchedule.ScheduleState;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  auth: fromAuth.authReducer,
  profile: fromProfile.profileReducer,
  references: fromReferences.referencesReducer,
  schedule: fromSchedule.scheduleReducer,
  debug: fromDebug.debugReducer
};

const appReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return appReducer(state, action);
}



export const getAuthState = (state: AppState) => state.auth;
export const getProfileState = (state: AppState) => state.profile;
export const getReferencesState = (state: AppState) => state.references;
export const getScheduleState = (state: AppState) => state.schedule;



/*======================================================*/
/*====================AUTH SELECTORS====================*/
/*======================================================*/
let getToken = createSelector(getAuthState, fromAuth.getToken);
let getAuthStatus = createSelector(getAuthState, fromAuth.getAuthenticated);
let getRedirectURL = createSelector(getAuthState, fromAuth.getRedirectURL);
let getAuthError = createSelector(getAuthState, fromAuth.getErrorMsg);
let getAuthLoadingState = createSelector(getAuthState, fromAuth.getLoading);



/*======================================================*/
/*===================PROFILE SELECTORS==================*/
/*======================================================*/
let getMyProfile = createSelector(getProfileState, fromProfile.getMyProfile);



/*======================================================*/
/*=================REFERENCES SELECTORS=================*/
/*======================================================*/
let getGroupPositions = createSelector(getReferencesState, fromReferences.getGroupPositions);
let getGroupSpecializations = createSelector(getReferencesState, fromReferences.getGroupSpecializations);
let getRegions = createSelector(getReferencesState, fromReferences.getRegions);
let getStates = createSelector(getReferencesState, fromReferences.getStates);
let getTimeZones = createSelector(getReferencesState, fromReferences.getTimeZones);
let getReferencesTypes = createSelector(getReferencesState, fromReferences.getReferencesTypes);
let getEmployeeStatuses = createSelector(getReferencesState, fromReferences.getEmployeeStatuses);




/*======================================================*/
/*==================SCHEDULE SELECTORS==================*/
/*======================================================*/
let getScheduleMonths = createSelector(getScheduleState, fromSchedule.getScheduleMonths);
let getFullSchedule = createSelector(getScheduleState, fromSchedule.getMySchedule);
let getSelectedDateSchedule = createSelector(getScheduleState, fromSchedule.getSelectedDateSchedule);
let getMySelectedDate = createSelector(getScheduleState, fromSchedule.getMySelectedDate);
let getHomeViewType = createSelector(getScheduleState, fromSchedule.getHomeViewType);
let getTotalWorkCount = createSelector(getScheduleState, fromSchedule.getTotalWorkCount);
let getScheduleLoadingState = createSelector(getScheduleState, fromSchedule.getScheduleLoadingState);
let getSelectedDateScheduleGroupedByDay = createSelector(getScheduleState, fromSchedule.getSelectedDateScheduleGroupedByDay);

let getEstimateEarnings = createSelector(
  getTotalWorkCount,
  getMyProfile,
  (wCount: number, profile: Employee | null) => {
    if (!profile || !profile.WorkUnitValue || !wCount) {
      return 0;
    } else {
      return wCount * profile.WorkUnitValue;
    }
  }
);



export const authSelectors = {
  getToken: getToken,
  getAuthStatus: getAuthStatus,
  getRedirectURL: getRedirectURL,
  getAuthError: getAuthError,
  getAuthLoadingState: getAuthLoadingState
};

export const profileSelectors = {
  getMyProfile: getMyProfile,
};

export const referenceSelectors = {
  getGroupPositions: getGroupPositions,
  getGroupSpecializations: getGroupSpecializations,
  getRegions: getRegions,
  getStates: getStates,
  getTimeZones: getTimeZones,
  getReferencesTypes: getReferencesTypes,
  getEmployeeStatuses: getEmployeeStatuses
};


export const scheduleSelectors = {
  getScheduleMonths: getScheduleMonths,
  getFullSchedule: getFullSchedule,
  getSelectedDateSchedule: getSelectedDateSchedule,
  getMySelectedDate: getMySelectedDate,
  getHomeViewType: getHomeViewType,
  getTotalWorkCount: getTotalWorkCount,
  getEstimateEarnings: getEstimateEarnings,
  getScheduleLoadingState: getScheduleLoadingState,
  getSelectedDateScheduleGroupedByDay: getSelectedDateScheduleGroupedByDay
};
