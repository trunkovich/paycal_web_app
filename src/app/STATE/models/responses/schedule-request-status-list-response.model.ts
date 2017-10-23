import { Response } from './response.model';
import { ScheduleRequestStatusType } from '../schedule-request-status.model';

export interface ScheduleRequestStatusListListResponse extends Response {
  ScheduleRequestStatusList: ScheduleRequestStatusType[];
}
