import {AuthState} from '../reducers/auth.reducer';
import {ProfileState} from '../reducers/profile.reducer';
import {ReferencesState} from '../reducers/references.reducer';
import {ScheduleState} from '../reducers/schedule.reducer';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
  references: ReferencesState;
  schedule: ScheduleState;
}
