/**
 * Created by TrUnK on 16.01.2017.
 */

import {Injectable} from '@angular/core';
import {Api} from './api.service';
import {Observable} from 'rxjs';

import {GroupPosition} from '../../STATE/models/group-position.model';
import {GroupSpecialization} from '../../STATE/models/group-specialization.model';
import {Region} from '../../STATE/models/region.model';
import {State} from '../../STATE/models/state.model';
import {TimeZone} from '../../STATE/models/time-zone.model';
import {ReferenceType} from '../../STATE/models/reference-type.model';
import {EmployeeStatus} from '../../STATE/models/employee-status.model';
import {GroupPositionListResponse} from '../../STATE/models/responses/group-position-list-response.model';
import {GroupSpecializationListResponse} from '../../STATE/models/responses/group-specializationi-list-response.model';
import {RegionListResponse} from '../../STATE/models/responses/region-list-reponse.model';
import {StateListResponse} from '../../STATE/models/responses/state-list-reponse.model';
import {TimeZoneListResponse} from '../../STATE/models/responses/time-zone-list-reponse.model';
import {ReferenceTypeListResponse} from '../../STATE/models/responses/reference-type-list-response.model';
import {EmployeeStatusListResponse} from '../../STATE/models/responses/employee-status-list-response.model';

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
}
