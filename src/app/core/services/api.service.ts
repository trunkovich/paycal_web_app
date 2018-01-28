import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import * as _ from 'lodash';

import { APP_CONFIG } from '../../../environments/environment';
import { ResetPasswordModel } from '../../STATE/models/reset-password.model';
import { CompleteRegistrationModel } from '../../STATE/models/complete-registration.model';
import { Lead } from '../../STATE/models/lead.model';
import { ScheduleMonthRequest } from '../../STATE/models/requests/schedule-month.request.model';
import { EmployeeScheduleEntryListResponse } from '../../STATE/models/responses/employee-schedule-entry-list-response.model';
import { Observable } from 'rxjs';
import { GroupScheduleListResponse } from '../../STATE/models/responses/group-schedule-list-response.model';
import { EmployeeListResponse } from '../../STATE/models/responses/employee-list-response.model';
import { CoverageRequest } from '../../STATE/models/requests/coverage-request.request.model';
import { Response } from '../../STATE/models/responses/response.model';
import { LaborCodeListResponse } from '../../STATE/models/responses/labor-code-list-response.model';
import {
  GroupMemberScheduleMonthRequest,
  LaborCodeScheduleMonthRequest
} from '../../STATE/models/requests/labor-code-schedule-month.request.model';
import { LaborCodeScheduleDayRequest } from '../../STATE/models/requests/labor-code-schedule-day.request.model';
import { MasterCalendarEntryListResponse } from '../../STATE/models/responses/master-calendar-entry-list-response.model';
import { EditEmployeeRequestData } from '../../STATE/models/employee.model';
import { CloudinaryResponse } from '../../STATE/models/responses/cloudinary-response.model';
import {
  CreateCallUnavailabilityWindowRequest,
  CreateEducationalLeaveRequest,
  CreateHospitalRoundingRequest,
  CreatePreferredCallNightRequest,
  CreatePreferredOffWeekendRequest,
  CreateVacationWindowRequest,
  CreateVolunteerShiftRequest,
  ScheduleRequestIDRequest,
  UpdateScheduleRequestEmployeeNotesRequest,
  UpdateScheduleRequestUseCompTimeRequest
} from '../../STATE/models/requests/create-schedule-request.model';
import {
  ScheduleRequestByEmployeeListResponse,
  ScheduleRequestDetailsResponse
} from '../../STATE/models/responses/create-schedule-response.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class Api {
  private headers: HttpHeaders;

  constructor(private $http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

  request(method, url, data = {}) {
    let params: HttpParams = new HttpParams();
    _.toPairs(data).forEach(function(dataEntry) {
      params = params.set(dataEntry[0], (dataEntry[1] as string));
    });
    return this.$http.request(method, `${APP_CONFIG.API_BASE_URL}${url}`, {params: params, headers: this.headers});
  }

  signIn(data) {
    return this.request('get', 'EmployeeSignIn', data);
  }

  saveLead(data: Lead) {
    return this.request('get', 'SaveLead', data);
  }

  completeRegistration(data: CompleteRegistrationModel) {
    return this.request('get', 'CompleteEmployeeRegistration', data);
  }

  requestPasswordRecovery(data) {
    return this.request('get', 'RequestPasswordReset', data);
  }

  resetPassword(data: ResetPasswordModel) {
    return this.request('get', 'CompletePasswordReset', data);
  }

  changePassword(data: {newPassword: string}) {
    return this.request('get', 'UpdateEmployeePassword', data);
  }

  getProfile() {
    return this.request('get', 'GetEmployee');
  }

  updateProfile(data: EditEmployeeRequestData): Observable<Response> {
    return this.request('get', 'UpdateEmployee', data);
  }

  updateProfileImage(data: {pictureUrl: string}): Observable<Response> {
    return this.request('get', 'SetEmployeePicture', data);
  }

  getReference(type: string, data: {groupId?: number} = {}) {
    return this.request('get', `Get${type}`, data);
  }

  getMyMonthSchedule(data: ScheduleMonthRequest): Observable<EmployeeScheduleEntryListResponse> {
    return this.request('get', 'GetEmployeeMonthSchedule', data);
  }
  getGroupScheduleMonths(): Observable<GroupScheduleListResponse> {
    return this.request('get', 'GetLiveGroupScheduleMonths');
  }
  getEmployeesToCoverMyShift(data: {employeeScheduleEntryID: number}): Observable<EmployeeListResponse> {
    return this.request('get', 'FindEmployeesToCoverMyShift', data);
  }
  createCoverageRequest(data: CoverageRequest): Observable<Response> {
    return this.request('get', 'CreateCoverageRequest', data);
  }
  getOrReferenceLaborCodes(data: ScheduleMonthRequest): Observable<LaborCodeListResponse> {
    return this.request('get', 'GetORReferenceLaborCodes', data);
  }
  getCallReferenceLaborCodes(data: ScheduleMonthRequest): Observable<LaborCodeListResponse> {
    return this.request('get', 'GetCallReferenceLaborCodes', data);
  }
  getLaborCodeMonthSchedule(data: LaborCodeScheduleMonthRequest): Observable<MasterCalendarEntryListResponse> {
    return this.request('get', 'GetLaborCodeMonthSchedule', data);
  }
  getGroupMemberMonthSchedule(data: GroupMemberScheduleMonthRequest): Observable<EmployeeScheduleEntryListResponse> {
    return this.request('get', 'GetGroupMemberEmployeeMonthSchedule', data);
  }
  getEmployeesInMyGroup(): Observable<EmployeeListResponse> {
    return this.request('get', 'GetEmployeesInMyGroup');
  }
  getLaborCodeDaySchedule(data: LaborCodeScheduleDayRequest): Observable<MasterCalendarEntryListResponse> {
    return this.request('get', 'GetLaborCodeDaySchedule', data);
  }



  getScheduleRequestByEmployee(): Observable<ScheduleRequestByEmployeeListResponse> {
    return this.request('get', 'GetScheduleRequestByEmployee');
  }
  getScheduleRequestDetails(data: ScheduleRequestIDRequest): Observable<ScheduleRequestDetailsResponse> {
    return this.request('get', 'GetScheduleRequestDetails', data);
  }
  createVacationWindow(data: CreateVacationWindowRequest): Observable<Response> {
    return this.request('get', 'CreateVacationWindow', data);
  }
  createCallUnavailabilityWindow(data: CreateCallUnavailabilityWindowRequest): Observable<Response> {
    return this.request('get', 'CreateCallUnavailabilityWindow', data);
  }
  createPreferredCallNight(data: CreatePreferredCallNightRequest): Observable<Response> {
    return this.request('get', 'CreatePreferredCallNight', data);
  }
  createHospitalRounding(data: CreateHospitalRoundingRequest): Observable<Response> {
    return this.request('get', 'CreateHospitalRounding', data);
  }
  createVolunteerShift(data: CreateVolunteerShiftRequest): Observable<Response> {
    return this.request('get', 'CreateVolunteerShift', data);
  }
  createEducationalLeave(data: CreateEducationalLeaveRequest): Observable<Response> {
    return this.request('get', 'CreateEducationalLeave', data);
  }
  createPreferredOffWeekend(data: CreatePreferredOffWeekendRequest): Observable<Response> {
    return this.request('get', 'CreatePreferredOffWeekend', data);
  }
  deleteVacationWindows(data: ScheduleRequestIDRequest): Observable<Response> {
    return this.request('get', 'DeleteVacationWindows', data);
  }
  deleteCallUnavailabilityWindows(data: ScheduleRequestIDRequest): Observable<Response> {
    return this.request('get', 'DeleteCallUnavailabilityWindows', data);
  }
  deletePreferredCallNights(data: ScheduleRequestIDRequest): Observable<Response> {
    return this.request('get', 'DeletePreferredCallNights', data);
  }
  deleteHospitalRoundings(data: ScheduleRequestIDRequest): Observable<Response> {
    return this.request('get', 'DeleteHospitalRoundings', data);
  }
  deleteVolunteerShifts(data: ScheduleRequestIDRequest): Observable<Response> {
    return this.request('get', 'DeleteVolunteerShifts', data);
  }
  deleteEducationalLeaves(data: ScheduleRequestIDRequest): Observable<Response> {
    return this.request('get', 'DeleteEducationalLeaves', data);
  }
  deletePreferredOffWeekends(data: ScheduleRequestIDRequest): Observable<Response> {
    return this.request('get', 'DeletePreferredOffWeekends', data);
  }
  updateScheduleRequestUseCompTime(data: UpdateScheduleRequestUseCompTimeRequest): Observable<Response> {
    return this.request('get', 'UpdateScheduleRequestUseCompTime', data);
  }
  updateScheduleRequestEmployeeNotes(data: UpdateScheduleRequestEmployeeNotesRequest): Observable<Response> {
    return this.request( 'get', 'UpdateScheduleRequestEmployeeNotes', data);
  }



  uploadImage(image: File): Observable<CloudinaryResponse> {
    return Observable.fromPromise(this.upload(APP_CONFIG.CLOUDINARY_URL, image));
  }

  private upload (url: string, file: File ): Promise<any> {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData(),
          xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append('file', file, file.name);
      formData.append('upload_preset', APP_CONFIG.CLOUDINARY_UNSIGNED_PRESET);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
}
