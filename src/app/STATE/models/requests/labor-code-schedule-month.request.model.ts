/**
 * Created by TrUnK on 20.01.2017.
 */
import {ScheduleMonthRequest} from './schedule-month.request.model';

export interface LaborCodeScheduleMonthRequest extends ScheduleMonthRequest {
  laborCode: string;
}
