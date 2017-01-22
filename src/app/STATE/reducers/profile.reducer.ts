/**
 * Created by TrUnK on 06.01.2017.
 */
import * as profileActions from '../actions/profile.actions';
import {Employee} from '../models/employee.model';

export interface ProfileState {
  employee: Employee | null;
}

const initialProfileState = {
  employee: null
};

export function profileReducer(state: ProfileState = initialProfileState, action: profileActions.Actions): ProfileState {
  switch (action.type) {
    case profileActions.ActionTypes.GET_USER_PROFILE_SUCCESS: {
      return {
        employee: Object.assign({}, action.payload)
      };
    }
    case profileActions.ActionTypes.GET_USER_PROFILE_FAIL: {
      return {
        employee: null
      };
    }
    default: {
      return state;
    }
  }
}

export const getMyProfile = (state: ProfileState) => state.employee;
