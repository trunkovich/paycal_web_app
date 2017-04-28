/**
 * Created by TrUnK on 16.01.2017.
 */
import * as _ from 'lodash';

import * as referencesActions from '../actions/references.actions';
import { GroupPosition } from '../models/group-position.model';
import { GroupSpecialization } from '../models/group-specialization.model';
import { Region } from '../models/region.model';
import { State } from '../models/state.model';
import { TimeZone } from '../models/time-zone.model';
import { ReferenceType } from '../models/reference-type.model';
import { EmployeeStatus } from '../models/employee-status.model';

export interface ReferencesState {
  groupPositions: GroupPosition[];
  groupSpecializations: GroupSpecialization[];
  regions: Region[];
  states: State[];
  timeZones: TimeZone[];
  referencesTypes: ReferenceType[];
  employeeStatuses: EmployeeStatus[];
}

const initialReferencesState = {
  groupPositions: [],
  groupSpecializations: [],
  regions: [],
  states: [],
  timeZones: [],
  referencesTypes: [],
  employeeStatuses: []
};

export function referencesReducer(state: ReferencesState = initialReferencesState, action: referencesActions.Actions): ReferencesState {
  switch (action.type) {
    case referencesActions.ActionTypes.LOAD_GROUP_POSITIONS_SUCCESS: {
      return setReferenceItemHandler(state, (action as referencesActions.LoadGroupPositionsSuccessAction), 'groupPositions');
    }
    case referencesActions.ActionTypes.LOAD_GROUP_SPECIALIZATIONS_SUCCESS: {
      return setReferenceItemHandler(state, (action as referencesActions.LoadGroupSpecializationsSuccessAction), 'groupSpecializations');
    }
    case referencesActions.ActionTypes.LOAD_REGIONS_SUCCESS: {
      return setReferenceItemHandler(state, (action as referencesActions.LoadRegionsSuccessAction), 'regions');
    }
    case referencesActions.ActionTypes.LOAD_STATES_SUCCESS: {
      return setReferenceItemHandler(state, (action as referencesActions.LoadStatesSuccessAction), 'states');
    }
    case referencesActions.ActionTypes.LOAD_TIME_ZONES_SUCCESS: {
      return setReferenceItemHandler(state, (action as referencesActions.LoadTimeZonesSuccessAction), 'timeZones');
    }
    case referencesActions.ActionTypes.LOAD_REFERENCES_TYPES_SUCCESS: {
      return setReferenceItemHandler(state, (action as referencesActions.LoadReferencesTypesSuccessAction), 'referencesTypes');
    }
    case referencesActions.ActionTypes.LOAD_EMPLOYEE_STATUSES_SUCCESS: {
      return setReferenceItemHandler(state, (action as referencesActions.LoadEmployeeStatusesSuccessAction), 'employeeStatuses');
    }
    default: {
      return state;
    }
  }
}
/* ------------------------------------------------------------------ */
/* -------------------------REDUCER HANDLERS------------------------- */
/* ------------------------------------------------------------------ */
function setReferenceItemHandler(state: ReferencesState, action: referencesActions.LoadGroupPositionsSuccessAction |
                                                                referencesActions.LoadEmployeeStatusesSuccessAction |
                                                                referencesActions.LoadGroupSpecializationsSuccessAction |
                                                                referencesActions.LoadReferencesTypesSuccessAction |
                                                                referencesActions.LoadRegionsSuccessAction |
                                                                referencesActions.LoadStatesSuccessAction |
                                                                referencesActions.LoadTimeZonesSuccessAction, key: string) {
  let newState = _.cloneDeep(state);
  newState[key] = _.cloneDeep(action.payload);
  return newState;
}

/* ------------------------------------------------------------------- */
/* -----------------------------SELECTORS----------------------------- */
/* ------------------------------------------------------------------- */
export const getGroupPositions = (state: ReferencesState) => state.groupPositions;
export const getGroupSpecializations = (state: ReferencesState) => state.groupSpecializations;
export const getRegions = (state: ReferencesState) => state.regions;
export const getStates = (state: ReferencesState) => state.states;
export const getTimeZones = (state: ReferencesState) => state.timeZones;
export const getReferencesTypes = (state: ReferencesState) => state.referencesTypes;
export const getEmployeeStatuses = (state: ReferencesState) => state.employeeStatuses;
