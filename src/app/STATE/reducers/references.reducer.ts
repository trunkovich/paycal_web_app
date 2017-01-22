/**
 * Created by TrUnK on 16.01.2017.
 */
import * as referencesActions from '../actions/references.actions';
import {GroupPosition} from '../models/group-position.model';
import {GroupSpecialization} from '../models/group-specialization.model';
import {Region} from '../models/region.model';
import {State} from '../models/state.model';
import {TimeZone} from '../models/time-zone.model';
import {ReferenceType} from '../models/reference-type.model';
import {EmployeeStatus} from '../models/employee-status.model';

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
      return {
        groupPositions: action.payload,
        groupSpecializations: state.groupSpecializations,
        regions: state.regions,
        states: state.states,
        timeZones: state.timeZones,
        referencesTypes: state.referencesTypes,
        employeeStatuses: state.employeeStatuses
      };
    }
    case referencesActions.ActionTypes.LOAD_GROUP_SPECIALIZATIONS_SUCCESS: {
      return {
        groupPositions: state.groupPositions,
        groupSpecializations: action.payload,
        regions: state.regions,
        states: state.states,
        timeZones: state.timeZones,
        referencesTypes: state.referencesTypes,
        employeeStatuses: state.employeeStatuses
      };
    }
    case referencesActions.ActionTypes.LOAD_REGIONS_SUCCESS: {
      return {
        groupPositions: state.groupPositions,
        groupSpecializations: state.groupSpecializations,
        regions: action.payload,
        states: state.states,
        timeZones: state.timeZones,
        referencesTypes: state.referencesTypes,
        employeeStatuses: state.employeeStatuses
      };
    }
    case referencesActions.ActionTypes.LOAD_STATES_SUCCESS: {
      return {
        groupPositions: state.groupPositions,
        groupSpecializations: state.groupSpecializations,
        regions: state.regions,
        states: action.payload,
        timeZones: state.timeZones,
        referencesTypes: state.referencesTypes,
        employeeStatuses: state.employeeStatuses
      };
    }
    case referencesActions.ActionTypes.LOAD_TIME_ZONES_SUCCESS: {
      return {
        groupPositions: state.groupPositions,
        groupSpecializations: state.groupSpecializations,
        regions: state.regions,
        states: state.states,
        timeZones: action.payload,
        referencesTypes: state.referencesTypes,
        employeeStatuses: state.employeeStatuses
      };
    }
    case referencesActions.ActionTypes.LOAD_REFERENCES_TYPES_SUCCESS: {
      return {
        groupPositions: state.groupPositions,
        groupSpecializations: state.groupSpecializations,
        regions: state.regions,
        states: state.states,
        timeZones: state.timeZones,
        referencesTypes: action.payload,
        employeeStatuses: state.employeeStatuses
      };
    }
    case referencesActions.ActionTypes.LOAD_EMPLOYEE_STATUSES_SUCCESS: {
      return {
        groupPositions: state.groupPositions,
        groupSpecializations: state.groupSpecializations,
        regions: state.regions,
        states: state.states,
        timeZones: state.timeZones,
        referencesTypes: state.referencesTypes,
        employeeStatuses: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getGroupPositions = (state: ReferencesState) => state.groupPositions;
export const getGroupSpecializations = (state: ReferencesState) => state.groupSpecializations;
export const getRegions = (state: ReferencesState) => state.regions;
export const getStates = (state: ReferencesState) => state.states;
export const getTimeZones = (state: ReferencesState) => state.timeZones;
export const getReferencesTypes = (state: ReferencesState) => state.referencesTypes;
export const getEmployeeStatuses = (state: ReferencesState) => state.employeeStatuses;
