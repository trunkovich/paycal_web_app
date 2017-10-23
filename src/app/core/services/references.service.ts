/**
 * Created by TrUnK on 16.01.2017.
 */

import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { Observable } from 'rxjs';

import { GroupPosition } from '../../STATE/models/group-position.model';
import { GroupSpecialization } from '../../STATE/models/group-specialization.model';
import { Region } from '../../STATE/models/region.model';
import { State } from '../../STATE/models/state.model';
import { TimeZone } from '../../STATE/models/time-zone.model';
import { ReferenceType } from '../../STATE/models/reference-type.model';
import { EmployeeStatus } from '../../STATE/models/employee-status.model';
import { GroupPositionListResponse } from '../../STATE/models/responses/group-position-list-response.model';
import { GroupSpecializationListResponse } from '../../STATE/models/responses/group-specializationi-list-response.model';
import { RegionListResponse } from '../../STATE/models/responses/region-list-reponse.model';
import { StateListResponse } from '../../STATE/models/responses/state-list-reponse.model';
import { TimeZoneListResponse } from '../../STATE/models/responses/time-zone-list-reponse.model';
import { ReferenceTypeListResponse } from '../../STATE/models/responses/reference-type-list-response.model';
import { EmployeeStatusListResponse } from '../../STATE/models/responses/employee-status-list-response.model';
import { CallUnavailabilityType } from '../../STATE/models/call-unavailability-type.model';
import { CallUnavailabilityTypesListResponse } from '../../STATE/models/responses/call-unavailability-types-list-response.model';
import { CallNightType } from '../../STATE/models/call-night-type.model';
import { CallNightTypesListResponse } from '../../STATE/models/responses/call-night-types-list-response.model';
import { HospitalistRoundingType } from '../../STATE/models/hospitalist-rounding-type.model';
import { HospitalistRoundingTypesListResponse } from '../../STATE/models/responses/hospitalist-rounding-types-list-response.model';
import { Hospital } from '../../STATE/models/hospital.model';
import { HospitalsListResponse } from '../../STATE/models/responses/hospitals-list-response.model';
import { ShiftType } from '../../STATE/models/shift-type.model';
import { ShiftTypesListResponse } from '../../STATE/models/responses/shift-types-list-response.model';
import { ScheduleRequestStatusType } from '../../STATE/models/schedule-request-status.model';
import { ScheduleRequestStatusListListResponse } from '../../STATE/models/responses/schedule-request-status-list-response.model';
import { VacationWindowType } from '../../STATE/models/vacation-window-type.model';
import { VacationWindowTypesListResponse } from '../../STATE/models/responses/vacation-window-types-list-response.model';

@Injectable()
export class ReferencesService {

  constructor(private api: Api) {}

  getGroupPositions(data: {groupId: number}): Observable<GroupPosition[] | string> {
    return this.api.getReference('GroupPositions', data)
      .map((res: GroupPositionListResponse) => {
        if (res.IsSuccess) {
          return res.GroupPositionList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getGroupSpecializations(data: {groupId: number}): Observable<GroupSpecialization[] | string> {
    return this.api.getReference('GroupSpecializations', data)
      .map((res: GroupSpecializationListResponse) => {
        if (res.IsSuccess) {
          return res.GroupSpecializationList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getRegions(): Observable<Region[] | string> {
    return this.api.getReference('Regions')
      .map((res: RegionListResponse) => {
        if (res.IsSuccess) {
          return res.RegionList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getStates(): Observable<State[] | string> {
    return this.api.getReference('States')
      .map((res: StateListResponse) => {
        if (res.IsSuccess) {
          return res.StateList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getTimeZones(): Observable<TimeZone[] | string> {
    return this.api.getReference('TimeZones')
      .map((res: TimeZoneListResponse) => {
        if (res.IsSuccess) {
          return res.TimeZoneList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getReferenceTypes(): Observable<ReferenceType[] | string> {
    return this.api.getReference('ReferenceTypes')
      .map((res: ReferenceTypeListResponse) => {
        if (res.IsSuccess) {
          return res.ReferenceTypeList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getEmployeeStatuses(): Observable<EmployeeStatus[] | string> {
    return this.api.getReference('EmployeeStatuses')
      .map((res: EmployeeStatusListResponse) => {
        if (res.IsSuccess) {
          return res.EmployeeStatusList;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getCallUnavailabilityTypes(groupID: number): Observable<CallUnavailabilityType[] | string> {
    return this.api.request('get', 'GetCallUnavailabilityTypes', {groupID})
      .map((res: CallUnavailabilityTypesListResponse) => {
        if (res.IsSuccess) {
          return res.CallUnavailabilityTypeList;
        } else {
          throw Error(`Get Call Unavailability Types Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getCallNightTypes(groupID: number): Observable<CallNightType[] | string> {
    return this.api.request('get', 'GetCallNightTypes', {groupID})
      .map((res: CallNightTypesListResponse) => {
        if (res.IsSuccess) {
          return res.CallNightTypeList;
        } else {
          throw Error(`Get Call Night Types Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getHospitalistRoundingTypes(groupID: number): Observable<HospitalistRoundingType[] | string> {
    return this.api.request('get', 'GetHospitalistRoundingTypes', {groupID})
      .map((res: HospitalistRoundingTypesListResponse) => {
        if (res.IsSuccess) {
          return res.RoundingTypeList;
        } else {
          throw Error(`Get Hospitalist Rounding Types Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getHospitals(groupID: number): Observable<Hospital[] | string> {
    return this.api.request('get', 'GetHospitals', {groupID})
      .map((res: HospitalsListResponse) => {
        if (res.IsSuccess) {
          return res.HospitalList;
        } else {
          throw Error(`Get Hospitals Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getShiftTypes(groupID: number): Observable<ShiftType[] | string> {
    return this.api.request('get', 'GetShiftTypes', {groupID})
      .map((res: ShiftTypesListResponse) => {
        if (res.IsSuccess) {
          return res.ShiftList;
        } else {
          throw Error(`Get Shift Types Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getScheduleRequestStatusTypes(groupID: number): Observable<ScheduleRequestStatusType[] | string> {
    return this.api.request('get', 'GetScheduleRequestStatusTypes', {groupID})
      .map((res: ScheduleRequestStatusListListResponse) => {
        if (res.IsSuccess) {
          return res.ScheduleRequestStatusList;
        } else {
          throw Error(`Get Schedule Request Status Types Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  getVacationWindowTypes(groupID: number): Observable<VacationWindowType[] | string> {
    return this.api.request('get', 'GetVacationWindowTypes', {groupID})
      .map((res: VacationWindowTypesListResponse) => {
        if (res.IsSuccess) {
          return res.VacationWindowTypeList;
        } else {
          throw Error(`Get Vacation Window Types Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

}
