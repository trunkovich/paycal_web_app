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
import * as fromHome from './home.reducer';
import * as fromSearch from './search.reducer';
import * as fromDebug from './debug.reducer';
import {Employee} from '../models/employee.model';
import {environment} from '../../../environments/environment';
import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
  auth: fromAuth.AuthState;
  profile: fromProfile.ProfileState;
  references: fromReferences.ReferencesState;
  schedule: fromSchedule.ScheduleState;
  home: fromHome.HomeState;
  search: fromSearch.SearchState;
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
  home: fromHome.homeReducer,
  search: fromSearch.searchReducer,
  debug: fromDebug.debugReducer
};

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}



export const getAuthState = (state: AppState) => state.auth;
export const getProfileState = (state: AppState) => state.profile;
export const getReferencesState = (state: AppState) => state.references;
export const getScheduleState = (state: AppState) => state.schedule;
export const getHomeState = (state: AppState) => state.home;
export const getSearchState = (state: AppState) => state.search;



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
let getMyProfileErrorMsg = createSelector(getProfileState, fromProfile.getMyProfileErrorMsg);
let getMyProfileLoadingState = createSelector(getProfileState, fromProfile.getLoadingState);
let getUploadedImageData = createSelector(getProfileState, fromProfile.getUploadedImageData);



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
let getCurrentSection = createSelector(getScheduleState, fromSchedule.getCurrentSection);

/*======================================================*/
/*====================HOME SELECTORS====================*/
/*======================================================*/
let getHomeFullSchedule = createSelector(getHomeState, fromHome.getMySchedule);
let getHomeSelectedDateSchedule = createSelector(getHomeState, fromHome.getSelectedDateSchedule);
let getHomeSelectedDate = createSelector(getHomeState, fromHome.getMySelectedDate);
let getHomeViewType = createSelector(getHomeState, fromHome.getHomeViewType);
let getTotalWorkCount = createSelector(getHomeState, fromHome.getTotalWorkCount);
let getHomeLoadingState = createSelector(getHomeState, fromHome.getHomeLoadingState);
let getHomeSelectedDateScheduleGroupedByDay = createSelector(getHomeState, fromHome.getSelectedDateScheduleGroupedByDay);
let getShiftEmployees = createSelector(getHomeState, fromHome.getShiftEmployees);
let getSortedShiftEmployees = createSelector(getHomeState, fromHome.getSortedShiftEmployees);
let isAnyPhysicianSelected = createSelector(getHomeState, fromHome.isAnyPhysicianSelected);
let getHomeScheduleEntryById = (id) => createSelector(getHomeState, fromHome.getScheduleEntryById(id));
let getHomeSortedSelectedDateSchedule = createSelector(getHomeState, fromHome.getSortedSelectedDateSchedule);
let getHomeGroupedSortedShiftEmployees = createSelector(getHomeState, fromHome.getGroupedSortedShiftEmployees);

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

/*======================================================*/
/*===================SEARCH SELECTORS===================*/
/*======================================================*/
let getSearchResults = createSelector(getSearchState, fromSearch.getSearchResults);
let getSearchType = createSelector(getSearchState, fromSearch.getSearchType);
let getScheduleSearchText = createSelector(getSearchState, fromSearch.getSearchText);
let getSearchLoadingState = createSelector(getSearchState, fromSearch.getLoadingState);
let getEmployeeFromGroupById = (id) => createSelector(getSearchState, fromSearch.getEmployeeById(id));
let getSearchEntryId = createSelector(getSearchState, fromSearch.getSearchEntryId);
let getSearchViewType = createSelector(getSearchState, fromSearch.getViewType);
let getSearchSelectedDate = createSelector(getSearchState, fromSearch.getSelectedDate);
let getSearchFullSchedule = createSelector(getSearchState, fromSearch.getSearchSchedule);
let getSearchSortedSelectedDateSchedule = createSelector(getSearchState, fromSearch.getSortedSelectedDateSchedule);
let getSearchSelectedDateScheduleGroupedByDay = createSelector(getSearchState, fromSearch.getSelectedDateScheduleGroupedByDay);
let getEmployeesInGroupList = createSelector(getSearchState, fromSearch.getEmployeesInGroupList);
let getSearchScheduleLoadingState = createSelector(getSearchState, fromSearch.getScheduleLoadingState);

export const authSelectors = {
  getToken: getToken,
  getAuthStatus: getAuthStatus,
  getRedirectURL: getRedirectURL,
  getAuthError: getAuthError,
  getAuthLoadingState: getAuthLoadingState
};

export const profileSelectors = {
  getMyProfile: getMyProfile,
  getMyProfileErrorMsg: getMyProfileErrorMsg,
  getLoadingState: getMyProfileLoadingState,
  getUploadedImageData: getUploadedImageData
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
  getCurrentSection: getCurrentSection
};

export const homeSelectors = {
  getHomeFullSchedule: getHomeFullSchedule,
  getHomeSelectedDateSchedule: getHomeSelectedDateSchedule,
  getHomeSelectedDate: getHomeSelectedDate,
  getHomeViewType: getHomeViewType,
  getTotalWorkCount: getTotalWorkCount,
  getHomeLoadingState: getHomeLoadingState,
  getHomeSelectedDateScheduleGroupedByDay: getHomeSelectedDateScheduleGroupedByDay,
  getShiftEmployees: getShiftEmployees,
  getSortedShiftEmployees: getSortedShiftEmployees,
  isAnyPhysicianSelected: isAnyPhysicianSelected,
  getHomeScheduleEntryById: getHomeScheduleEntryById,
  getHomeSortedSelectedDateSchedule: getHomeSortedSelectedDateSchedule,
  getHomeGroupedSortedShiftEmployees: getHomeGroupedSortedShiftEmployees,
  getEstimateEarnings: getEstimateEarnings
};

export const searchSelectors = {
  getSearchResults: getSearchResults,
  getSearchType: getSearchType,
  getSearchText: getScheduleSearchText,
  getEmployeesInGroupList: getEmployeesInGroupList,
  getEmployeeFromGroupById: getEmployeeFromGroupById,
  getLoadingState: getSearchLoadingState,
  getSearchEntryId: getSearchEntryId,
  getViewType: getSearchViewType,
  getSelectedDate: getSearchSelectedDate,
  getFullSchedule: getSearchFullSchedule,
  getSortedSelectedDateSchedule: getSearchSortedSelectedDateSchedule,
  getSelectedDateScheduleGroupedByDay: getSearchSelectedDateScheduleGroupedByDay,
  getScheduleLoadingState: getSearchScheduleLoadingState
};
