import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import * as _ from 'lodash';

import {APP_CONFIG} from '../../../environments/environment';
import {ResetPasswordModel} from '../../STATE/models/reset-password.model';
import {CompleteRegistrationModel} from '../../STATE/models/complete-registration.model';

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

  completeRegistration(data: CompleteRegistrationModel) {
    return this.request('get', 'CompleteEmployeeRegistration', data);
  }

  requestPasswordRecovery(data) {
    return this.request('get', 'RequestPasswordReset', data);
  }

  resetPassword(data: ResetPasswordModel) {
    return this.request('get', 'CompletePasswordReset', data);
  }

  getProfile() {
    return this.request('get', 'GetEmployee');
  }

  getReference(type: string, data: {groupId?: number} = {}) {
    return this.request('get', `Get${type}`, data);
  }
}
