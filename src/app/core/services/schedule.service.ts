/**
 * Created by TrUnK on 16.01.2017.
 */

import {Injectable} from '@angular/core';
import {Api} from './api.service';
import {Observable} from 'rxjs';

import {EmployeeScheduleEntryListResponse} from '../../STATE/models/responses/employee-schedule-entry-list-response.model';
import {EmployeeScheduleEntry} from '../../STATE/models/employee-schedule-entry.model';
import {GroupScheduleListResponse} from '../../STATE/models/responses/group-schedule-list-response.model';
import {GroupSchedule} from '../../STATE/models/group-schedule.model';
import {EmployeeListResponse} from '../../STATE/models/responses/employee-list-response.model';
import {Employee} from '../../STATE/models/employee.model';
import {CoverageRequest} from '../../STATE/models/requests/coverage-request.request.model';
import {Response} from '../../STATE/models/responses/response.model';
import {LaborCodeListResponse} from '../../STATE/models/responses/labor-code-list-response.model';
import {MasterCalendarEntryListResponse} from '../../STATE/models/responses/master-calendar-entry-list-response.model';
import {MasterCalendarEntry} from '../../STATE/models/master-calendar-entry.model';

@Injectable()
export class ScheduleService {

  constructor(private api: Api) {}

  getMyMonthSchedule(data: { month: number; year: number; }): Observable<EmployeeScheduleEntry[] | string> {
    return this.api.getMyMonthSchedule({
      scheduleMonth: data.month,
      scheduleYear: data.year
    })
      .map((res: EmployeeScheduleEntryListResponse) => {
        if (res.IsSuccess) {
          return res.EmployeeScheduleEntryList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getGroupScheduleMonths(): Observable<GroupSchedule[] | string> {
    return this.api.getGroupScheduleMonths()
      .map((res: GroupScheduleListResponse) => {
        if (res.IsSuccess) {
          return res.GroupScheduleList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getEmployeesToCoverMyShift(data: {employeeScheduleEntryID: number}): Observable<Employee[] | string> {
    return this.api.getEmployeesToCoverMyShift(data)
      .map((res: EmployeeListResponse) => {
        if (res.IsSuccess) {
          return res.EmployeeList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  createCoverageRequest(data: CoverageRequest): Observable<boolean | string> {
    return this.api.createCoverageRequest(data)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getOrReferenceLaborCodes(data: { month: number; year: number; }): Observable<string[] | string> {
    return this.api.getOrReferenceLaborCodes({
      scheduleMonth: data.month,
      scheduleYear: data.year
    })
      .map((res: LaborCodeListResponse) => {
        if (res.IsSuccess) {
          return res.LaborCodeList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getCallReferenceLaborCodes(data: { month: number; year: number; }): Observable<string[] | string> {
    return this.api.getCallReferenceLaborCodes({
      scheduleMonth: data.month,
      scheduleYear: data.year
    })
      .map((res: LaborCodeListResponse) => {
        if (res.IsSuccess) {
          return res.LaborCodeList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getLaborCodeMonthSchedule(data: { month: number; year: number; laborCode: string; }): Observable<MasterCalendarEntry[] | string> {
    return this.api.getLaborCodeMonthSchedule({
      scheduleMonth: data.month,
      scheduleYear: data.year,
      laborCode: data.laborCode
    })
      .map((res: MasterCalendarEntryListResponse) => {
        if (res.IsSuccess) {
          return res.MasterCalendarEntryList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getLaborCodeDaySchedule(data: {
    month: number;
    year: number;
    laborCode: string;
    day: number;
  }): Observable<MasterCalendarEntry[] | string> {
    return this.api.getLaborCodeDaySchedule({
      scheduleDay: data.day,
      scheduleMonth: data.month,
      scheduleYear: data.year,
      laborCode: data.laborCode
    })
      .map((res: MasterCalendarEntryListResponse) => {
        if (res.IsSuccess) {
          return res.MasterCalendarEntryList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getEmployeesInMyGroup(): Observable<Employee[] | string> {
    return this.api.getEmployeesInMyGroup()
      .map((res: EmployeeListResponse) => {
        if (res.IsSuccess) {
          return res.EmployeeList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }
}
