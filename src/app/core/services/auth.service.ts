/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { EmployeeSignInResponse } from '../../STATE/models/responses/employee-sign-in-response.model';
import { Credentials } from '../../STATE/models/credentials.model';
import { APP_CONFIG } from '../../../environments/environment';
import { EditEmployeeRequestData, Employee } from '../../STATE/models/employee.model';
import { EmployeeResponse } from '../../STATE/models/responses/employee-response.model';
import { TokenObject } from '../../STATE/models/token.model';
import { Response } from '../../STATE/models/responses/response.model';
import { Api } from './api.service';
import { ResetPasswordModel } from '../../STATE/models/reset-password.model';
import { CompleteRegistrationModel } from '../../STATE/models/complete-registration.model';
import { Lead } from '../../STATE/models/lead.model';
import { AppState, authSelectors } from '../../STATE/reducers/index';
import { CloudinaryResponse } from '../../STATE/models/responses/cloudinary-response.model';
import { first, map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private api: Api, private store: Store<AppState>, private router: Router) {}


  signIn(credentials: Credentials): Observable<TokenObject | string> {
    return this.api.signIn({
      'mobilePhone': credentials.phone,
      'password': credentials.password
    })
      .pipe(
        map((res: EmployeeSignInResponse) => {
          if (res.IsSuccess) {
            return {token: res.LoginToken, rememberMe: credentials.rememberMe};
          } else {
            throw Error(res.ErrorMessage);
          }
        })
      );
  }

  saveLead(data: Lead): Observable<boolean | string> {
    return this.api.saveLead(data)
      .pipe(
        map((res: Response) => {
          if (res.IsSuccess) {
            return true;
          } else {
            throw Error(res.ErrorMessage);
          }
        })
      );
  }


  logout() {
    AuthService.removeToken();
    this.redirectToLogin();
  }

  continueRegistration(completeRegistrationData: CompleteRegistrationModel): Observable<TokenObject | string> {
    return this.api.completeRegistration(completeRegistrationData)
      .pipe(
        map((res: EmployeeSignInResponse) => {
          if (res.IsSuccess) {
            return {token: res.LoginToken, rememberMe: true};
          } else {
            throw Error(res.ErrorMessage);
          }
        })
      );
  }

  requestPasswordRecovery(phone): Observable<boolean | string> {
    return this.api.requestPasswordRecovery({
      'mobilePhone': phone
    })
      .pipe(
        map((res: Response) => {
          if (res.IsSuccess) {
            return true;
          } else {
            throw Error(res.ErrorMessage);
          }
        })
      );
  }

  resetPassword(resetPasswordData: ResetPasswordModel): Observable<boolean | string> {
    return this.api.resetPassword(resetPasswordData)
      .pipe(
        map((res: Response) => {
          if (res.IsSuccess) {
            return true;
          } else {
            throw Error(res.ErrorMessage);
          }
        })
      );
  }

  changePassword(password: string): Observable<boolean | string> {
    return this.api.changePassword({newPassword: password})
      .pipe(
        map((res: Response) => {
          if (res.IsSuccess) {
            return true;
          } else {
            throw Error(res.ErrorMessage);
          }
        })
      );
  }

  getProfile(): Observable<Employee> {
    return this.api.getProfile()
      .pipe(
        map((res: EmployeeResponse) => {
          if (res.IsSuccess) {
            return res.Employee;
          } else {
            throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
          }
        })
      );
  }

  updateProfile(data: EditEmployeeRequestData): Observable<boolean | string> {
    data = _.clone(data);
    if (!('mobilePhone' in data)) {
      data.mobilePhone = '';
    }
    if (!('email' in data)) {
      data.email = '';
    }
    return this.api.updateProfile(data)
      .pipe(
        map((res: Response) => {
          if (res.IsSuccess) {
            return true;
          } else {
            throw Error(res.ErrorMessage);
          }
        })
      );
  }

  updateProfileImage(url: string): Observable<boolean | string> {
    return this.api.updateProfileImage({pictureUrl: url})
      .pipe(
        map((res: Response) => {
          if (res.IsSuccess) {
            return true;
          } else {
            throw Error(res.ErrorMessage);
          }
        })
      );
  }

  uploadImage(image: File): Observable<string> {
    return this.api.uploadImage(image)
      .pipe(
        map((res: CloudinaryResponse) => {
          if (!res.error) {
            return res.url;
          } else {
            throw Error(res.error.message);
          }
        })
      );
  }

  redirectAfterPasswordRecoveryRequest() {
    this.router.navigate(['/', 'forgot-password-success']);
  }
  redirectAfterResetPassword() {
    this.router.navigate(['/', 'password-reset-success']);
  }

  redirectAfterSaveLead() {
    this.router.navigate(['/', 'registration-success']);
  }

  redirectAfterCompleteRegistration() {
    this.router.navigate(['/', 'complete-registration-success']);
  }

  redirectAfterChangePassword() {
    this.router.navigate(['/', 'change-password-success']);
  }

  redirectToLogin() {
    this.router.navigate(['/', 'login']);
  }

  redirectToProfile() {
    this.router.navigate(['/', 'profile']);
  }

  redirectToCropAvatar() {
    this.router.navigate(['/', 'crop-avatar']);
  }

  redirectToCropLoading() {
    this.router.navigate(['/', 'crop-loading']);
  }

  redirectAfterLogin() {
    this.store.select(authSelectors.getRedirectURL)
      .pipe(
        first()
      )
      .subscribe((url) => {
        this.router.navigateByUrl(url || APP_CONFIG.DEFAULT_REDIRECT_URL);
      });
  }

  static readToken(): Observable<string> {
    let token: string;
    let err: string;

    try {
      token = sessionStorage.getItem(APP_CONFIG.LS_TOKEN_KEY);
    } catch (error) {
      err = 'Get Token Error: ' + error;
    }

    if (!token) {
      try {
        token = localStorage.getItem(APP_CONFIG.LS_TOKEN_KEY);
      } catch (error) {
        err = 'Get Token Error: ' + error;
      }
    }

    if (!token) {
      err = 'Not Authenticated';
    }

    if (err) {
      return Observable.throw(err);
    } else {
      return Observable.of(token);
    }
  }

  static storeToken(tokenObj: TokenObject) {
    if (!tokenObj || !tokenObj.token) { return false; }

    try {
      if (tokenObj.rememberMe) {
        localStorage.setItem(APP_CONFIG.LS_TOKEN_KEY, tokenObj.token);
      } else {
        localStorage.removeItem(APP_CONFIG.LS_TOKEN_KEY);
        sessionStorage.setItem(APP_CONFIG.LS_TOKEN_KEY, tokenObj.token);
      }
    } catch (error) {
      console.error(error);
    }
  }

  static removeToken() {
    try {
      localStorage.removeItem(APP_CONFIG.LS_TOKEN_KEY);
      sessionStorage.removeItem(APP_CONFIG.LS_TOKEN_KEY);
    } catch (error) {
      console.error(error);
    }
  }
}
