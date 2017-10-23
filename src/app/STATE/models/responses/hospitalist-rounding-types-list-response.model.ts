import { Response } from './response.model';
import { HospitalistRoundingType } from '../hospitalist-rounding-type.model';

export interface HospitalistRoundingTypesListResponse extends Response {
  RoundingTypeList: HospitalistRoundingType[];
}

