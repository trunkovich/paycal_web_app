/**
 * Created by TrUnK on 21.01.2017.
 */
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

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

export const getToken = createSelector(getAuthState, fromAuth.getToken);
export const getAuthStatus = createSelector(getAuthState, fromAuth.getAuthStatus);
export const getRedirectUrl = createSelector(getAuthState, fromAuth.getRedirectUrl);
export const getAuthErrorMsg = createSelector(getAuthState, fromAuth.getErrorMsg);
export const getAuthLoadingState = createSelector(getAuthState, fromAuth.getLoadingState);

export const getScheduleMonths = createSelector(getScheduleState, fromSchedule.getScheduleMonths);
export const getMonthSchedule = createSelector(getScheduleState, fromSchedule.getMonthSchedule);
export const getMySelectedDate = createSelector(getScheduleState, fromSchedule.getMySelectedDate);


/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
// export const getSearchState = (state: State) => state.search;
//
// export const getSearchBookIds = createSelector(getSearchState, fromSearch.getIds);
// export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
// export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);


/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
// export const getSearchResults = createSelector(getBookEntities, getSearchBookIds, (books, searchIds) => {
//   return searchIds.map(id => books[id]);
// });



// export const getCollectionState = (state: State) => state.collection;
//
// export const getCollectionLoaded = createSelector(getCollectionState, fromCollection.getLoaded);
// export const getCollectionLoading = createSelector(getCollectionState, fromCollection.getLoading);
// export const getCollectionBookIds = createSelector(getCollectionState, fromCollection.getIds);
//
// export const getBookCollection = createSelector(getBookEntities, getCollectionBookIds, (entities, ids) => {
//   return ids.map(id => entities[id]);
// });
//
// export const isSelectedBookInCollection = createSelector(getCollectionBookIds, getSelectedBookId, (ids, selected) => {
//   return ids.indexOf(selected) > -1;
// });

/**
 * Layout Reducers
 */
// export const getLayoutState = (state: State) => state.layout;
//
// export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
