import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import * as _ from 'lodash';

import {APP_CONFIG} from '../../../environments/environment';
import {ResetPasswordModel} from '../../STATE/models/reset-password.model';
import {CompleteRegistrationModel} from '../../STATE/models/complete-registration.model';
import {Lead} from '../../STATE/models/lead.model';
import {ScheduleMonthRequest} from '../../STATE/models/requests/schedule-month.request.model';
import {EmployeeScheduleEntryListResponse} from '../../STATE/models/responses/employee-schedule-entry-list-response.model';
import {Observable} from 'rxjs';
import {GroupScheduleListResponse} from '../../STATE/models/responses/group-schedule-list-response.model';
import {EmployeeListResponse} from '../../STATE/models/responses/employee-list-response.model';
import {CoverageRequest} from '../../STATE/models/requests/coverage-request.request.model';
import {Response} from '../../STATE/models/responses/response.model';
import {LaborCodeListResponse} from '../../STATE/models/responses/labor-code-list-response.model';
import {LaborCodeScheduleMonthRequest} from '../../STATE/models/requests/labor-code-schedule-month.request.model';
import {LaborCodeScheduleDayRequest} from '../../STATE/models/requests/labor-code-schedule-day.request.model';
import {MasterCalendarEntryListResponse} from '../../STATE/models/responses/master-calendar-entry-list-response.model';
import {EditEmployeeRequestData} from '../../STATE/models/employee.model';
import {CloudinaryResponse} from '../../STATE/models/responses/cloudinary-response.model';

@Injectable()
export class Api {
  private headers: Headers;

  constructor(private $http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  request(method, url, data = {}) {
    let params: URLSearchParams = new URLSearchParams();
    _.toPairs(data).forEach(function(dataEntry) {
      params.set(dataEntry[0], dataEntry[1]);
    });
    return this.$http.request(`${APP_CONFIG.API_BASE_URL}${url}`, {method: method, search: params, headers: this.headers})
      .map(res => res.json());
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
  getEmployeesInMyGroup(): Observable<EmployeeListResponse> {
    return this.request('get', 'GetEmployeesInMyGroup');
  }
  getLaborCodeDaySchedule(data: LaborCodeScheduleDayRequest): Observable<MasterCalendarEntryListResponse> {
    return this.request('get', 'GetLaborCodeDaySchedule', data);
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
