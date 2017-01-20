/**
 * Created by TrUnK on 20.01.2017.
 */
import {LaborCodeScheduleMonthRequest} from './labor-code-schedule-month.request.model';

export interface LaborCodeScheduleDayRequest extends LaborCodeScheduleMonthRequest {
  scheduleDay: number;
}
