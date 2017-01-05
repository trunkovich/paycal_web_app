import {Employee} from "./employee.model";

export interface AppState {
  employees: Employee[]
}

export const initialAppState: AppState = {
  employees: []
};
