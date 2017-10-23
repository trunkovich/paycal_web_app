import { Response } from './response.model';
import { VacationWindowType } from '../vacation-window-type.model';

export interface VacationWindowTypesListResponse extends Response {
  VacationWindowTypeList: VacationWindowType[];
}
