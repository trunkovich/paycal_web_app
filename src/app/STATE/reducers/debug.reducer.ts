/**
 * Created by TrUnK on 06.01.2017.
 */
export interface DebugState {}

const initialDebugState = {};

export function debugReducer(state: DebugState = initialDebugState, action): DebugState {
  // console.log(action);
  return state;
}
