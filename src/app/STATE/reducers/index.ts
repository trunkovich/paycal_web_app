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

export const authSelectors = {
  getToken: createSelector(getAuthState, fromAuth.getToken),
  getAuthStatus: createSelector(getAuthState, fromAuth.getAuthenticated),
  getRedirectURL: createSelector(getAuthState, fromAuth.getRedirectURL),
  getAuthError: createSelector(getAuthState, fromAuth.getErrorMsg),
  getAuthLoadingState: createSelector(getAuthState, fromAuth.getLoading)
};
export const profileSelectors = {
  getMyProfile: createSelector(getProfileState, fromProfile.getMyProfile),
};
export const referenceSelectors = {
  getGroupPositions: createSelector(getReferencesState, fromReferences.getGroupPositions),
  getGroupSpecializations: createSelector(getReferencesState, fromReferences.getGroupSpecializations),
  getRegions: createSelector(getReferencesState, fromReferences.getRegions),
  getStates: createSelector(getReferencesState, fromReferences.getStates),
  getTimeZones: createSelector(getReferencesState, fromReferences.getTimeZones),
  getReferencesTypes: createSelector(getReferencesState, fromReferences.getReferencesTypes),
  getEmployeeStatuses: createSelector(getReferencesState, fromReferences.getEmployeeStatuses)
};

export const scheduleSelectors = {
  getScheduleMonths: createSelector(getScheduleState, fromSchedule.getScheduleMonths),
  getDailySchedule: createSelector(getScheduleState, fromSchedule.getDailySchedule),
  getMySelectedDate: createSelector(getScheduleState, fromSchedule.getMySelectedDate),
  getHomeViewType: createSelector(getScheduleState, fromSchedule.getHomeViewType)
};

