/**
 * Created by TrUnK on 16.01.2017.
 */

import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { Observable, from as observableFrom, of as observableOf } from 'rxjs';
import * as _ from 'lodash';

import { EmployeeScheduleEntryListResponse } from '../../STATE/models/responses/employee-schedule-entry-list-response.model';
import { AvailableMonthsStructure, EmployeeScheduleEntry, LoadedMonth } from '../../STATE/models/employee-schedule-entry.model';
import { GroupScheduleListResponse } from '../../STATE/models/responses/group-schedule-list-response.model';
import { GroupSchedule } from '../../STATE/models/group-schedule.model';
import { EmployeeListResponse } from '../../STATE/models/responses/employee-list-response.model';
import { Employee } from '../../STATE/models/employee.model';
import { CoverageRequest } from '../../STATE/models/requests/coverage-request.request.model';
import { Response } from '../../STATE/models/responses/response.model';
import { LaborCodeListResponse } from '../../STATE/models/responses/labor-code-list-response.model';
import { MasterCalendarEntryListResponse } from '../../STATE/models/responses/master-calendar-entry-list-response.model';
import { MasterCalendarEntry } from '../../STATE/models/master-calendar-entry.model';
import { Router } from '@angular/router';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ScheduleService {

  constructor(private api: Api, private router: Router) {}

  getMyMonthSchedule(data: { month: number; year: number; }): Observable<EmployeeScheduleEntry[] | string> {
    return this.api.getMyMonthSchedule({
      scheduleMonth: data.month,
      scheduleYear: data.year
    })
      .pipe(
        map((res: EmployeeScheduleEntryListResponse) => {
          if (res.IsSuccess) {
            return res.EmployeeScheduleEntryList;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  private getUnloadedMonths(months: AvailableMonthsStructure): LoadedMonth[] {
    let unloadedMonths = [];
    Object.keys(months).forEach((key) => {
      if (!months[key].loaded) {
        unloadedMonths.push(months[key]);
      }
    });
    return unloadedMonths;
  }

  loadMonths(months: AvailableMonthsStructure): Observable<LoadedMonth> {
    return observableFrom(this.getUnloadedMonths(months))
      .pipe(
        mergeMap((unloadedMonth: LoadedMonth) => {
          let unloaded = _.cloneDeep(unloadedMonth);
          return this.getMyMonthSchedule({year: unloadedMonth.year, month: unloadedMonth.month})
            .pipe(
              map((entries: EmployeeScheduleEntry[]) => {
                unloaded.entries = entries;
                unloaded.loaded = true;
                return unloaded;
              }),
              catchError((error) => {
                console.error(error);
                return observableOf(unloaded);
              })
            );
        })
      );
  }

  loadSearchMonths(months: AvailableMonthsStructure, type: string, id: string): Observable<LoadedMonth> {
    return observableFrom(this.getUnloadedMonths(months))
      .pipe(
        mergeMap((unloadedMonth: LoadedMonth) => {
          let unloaded = _.cloneDeep(unloadedMonth);
          let obs;
          if (type === 'physicians') {
            obs = this.getGroupMemberMonthSchedule({year: unloadedMonth.year, month: unloadedMonth.month, id: id});
          } else {
            obs = this.getLaborCodeMonthSchedule({year: unloadedMonth.year, month: unloadedMonth.month, id: id});
          }
          return obs
            .pipe(
              map((entries: EmployeeScheduleEntry[] | MasterCalendarEntry[]) => {
                unloaded.entries = entries;
                unloaded.loaded = true;
                return unloaded;
              }),
              catchError((error) => {
                console.error(error);
                return observableOf(unloaded);
              })
            );
        })
      );
  }

  findEmployeesToCoverMyShift(employeeScheduleEntryID): Observable<Employee[] | string> {
    return this.api.getEmployeesToCoverMyShift({employeeScheduleEntryID})
      .pipe(
        map((res: EmployeeListResponse) => {
          if (res.IsSuccess) {
            return res.EmployeeList;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  getGroupScheduleMonths(): Observable<GroupSchedule[] | string> {
    return this.api.getGroupScheduleMonths()
      .pipe(
        map((res: GroupScheduleListResponse) => {
          if (res.IsSuccess) {
            return res.GroupScheduleList;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  loadCallReference(date: Date): Observable<string[] | string> {
    return this.api.getCallReferenceLaborCodes({
      scheduleYear: date.getFullYear(),
      scheduleMonth: date.getMonth() + 1
    })
      .pipe(
        map((res: LaborCodeListResponse) => {
          if (res.IsSuccess) {
            return res.LaborCodeList;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  loadOrReference(date: Date): Observable<string[] | string> {
    return this.api.getOrReferenceLaborCodes({
      scheduleYear: date.getFullYear(),
      scheduleMonth: date.getMonth() + 1
    })
      .pipe(
        map((res: LaborCodeListResponse) => {
          if (res.IsSuccess) {
            return res.LaborCodeList;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  loadEmployeesInMyGroup(): Observable<Employee[] | string> {
    return this.api.getEmployeesInMyGroup()
      .pipe(
        map((res: EmployeeListResponse) => {
          if (res.IsSuccess) {
            return res.EmployeeList;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  createCoverageRequest(data: CoverageRequest): Observable<boolean | string> {
    return this.api.createCoverageRequest(data)
      .pipe(
        map((res: Response) => {
          if (res.IsSuccess) {
            return true;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  getLaborCodeMonthSchedule(data: { month: number; year: number; id: string; }): Observable<MasterCalendarEntry[] | string> {
    return this.api.getLaborCodeMonthSchedule({
      scheduleMonth: data.month,
      scheduleYear: data.year,
      laborCode: data.id
    })
      .pipe(
        map((res: MasterCalendarEntryListResponse) => {
          if (res.IsSuccess) {
            return res.MasterCalendarEntryList;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  getGroupMemberMonthSchedule(data: { month: number; year: number; id: string; }): Observable<EmployeeScheduleEntry[] | string> {
    return this.api.getGroupMemberMonthSchedule({
      scheduleMonth: data.month,
      scheduleYear: data.year,
      groupMemberEmployeeID: data.id
    })
      .pipe(
        map((res: EmployeeScheduleEntryListResponse) => {
          if (res.IsSuccess) {
            return res.EmployeeScheduleEntryList;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  // getLaborCodeDaySchedule(data: {
  //   month: number;
  //   year: number;
  //   laborCode: string;
  //   day: number;
  // }): Observable<MasterCalendarEntry[] | string> {
  //   return this.api.getLaborCodeDaySchedule({
  //     scheduleDay: data.day,
  //     scheduleMonth: data.month,
  //     scheduleYear: data.year,
  //     laborCode: data.laborCode
  //   })
  //     .map((res: MasterCalendarEntryListResponse) => {
  //       if (res.IsSuccess) {
  //         return res.MasterCalendarEntryList;
  //       } else {
  //         throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
  //       }
  //     });
  // }

  redidrectBeforeCreatingRequest() {
    this.router.navigate(['/', 'message-loading']);
  }

  redidrectAfterCreatingRequest() {
    this.router.navigate(['/', 'message-success']);
  }
}
