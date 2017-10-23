import { Response } from './response.model';
import { CallNightType } from '../call-night-type.model';

export interface CallNightTypesListResponse extends Response {
  CallNightTypeList: CallNightType[];
}
