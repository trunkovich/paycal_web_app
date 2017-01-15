/**
 * Created by TrUnK on 06.01.2017.
 */
import {Injectable} from '@angular/core';
import {EmployeeSignInResponse} from '../../STATE/models/responses/employee-sign-in-response.model';
import {Credentials} from '../../STATE/models/credentials.model';
import {Observable} from 'rxjs';
import {APP_CONFIG} from '../../../environments/environment';
import {Employee} from '../../STATE/models/employee.model';
import {EmployeeResponse} from '../../STATE/models/responses/employee-response.model';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {AppState} from '../../STATE/models/app-state.model';
import {TokenObject} from '../../STATE/models/token.model';
import {Response} from '../../STATE/models/responses/response.model';
import {AUTH_ROUTES} from '../../features/auth/auth.routes';
import {Api} from './api.service';
import {ResetPasswordModel} from '../../STATE/models/reset-password.model';
import {CompleteRegistrationModel} from '../../STATE/models/complete-registration.model';

@Injectable()
export class AuthService {

  constructor(private api: Api, private store: Store<AppState>, private router: Router) {}


  signIn(credentials: Credentials): Observable<TokenObject | string> {
    return this.api.signIn({
      'mobilePhone': credentials.phone,
      'password': credentials.password
    })
      .map((res: EmployeeSignInResponse) => {
        if (res.IsSuccess) {
          return {token: res.LoginToken, rememberMe: credentials.rememberMe};
        } else {
          throw Error(res.ErrorMessage);
        }
      });
  }

  continueRegistration(completeRegistrationData: CompleteRegistrationModel): Observable<TokenObject | string> {
    return this.api.completeRegistration(completeRegistrationData)
      .map((res: EmployeeSignInResponse) => {
        if (res.IsSuccess) {
          return {token: res.LoginToken, rememberMe: true};
        } else {
          throw Error(res.ErrorMessage);
        }
      });
  }

  requestPasswordRecovery(phone): Observable<boolean | string> {
    return this.api.requestPasswordRecovery({
      'mobilePhone': phone
    })
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(res.ErrorMessage);
        }
      });
  }

  resetPassword(resetPasswordData: ResetPasswordModel): Observable<boolean | string> {
    return this.api.resetPassword(resetPasswordData)
      .map((res: Response) => {
        if (res.IsSuccess) {
          return true;
        } else {
          throw Error(res.ErrorMessage);
        }
      });
  }

  getProfile(): Observable<Employee> {
    return this.api.getProfile()
      .map((res: EmployeeResponse) => {
        if (res.IsSuccess) {
          return res.Employee;
        } else {
          throw Error(`Get Employee Profile Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
  }

  redirectAfterPasswordRecoveryRequest() {
    this.router.navigate(['/', AUTH_ROUTES.FORGOT_PASSWORD_SUCCESS]);
  }
  redirectAfterResetPassword() {
    this.router.navigate(['/', AUTH_ROUTES.PASSWORD_RESET_SUCCESS]);
  }

  redirectAfterCompleteRegistration() {
    this.router.navigate(['/', AUTH_ROUTES.COMPLETE_REGISTRATION_SUCCESS]);
  }

  redirectToLogin() {
    this.router.navigate(['/', AUTH_ROUTES.LOGIN]);
  }

  redirectAfterLogin() {
    this.store.select((state) => state.auth.redirectUrl)
      .first()
      .subscribe((url) => {
        this.router.navigateByUrl(url || APP_CONFIG.DEFAULT_REDIRECT_URL);
      });
  }

  static readToken(): Observable<string> {
    let token: string;
    let err: string;

    try {
      token = localStorage.getItem(APP_CONFIG.LS_TOKEN_KEY);
    } catch (error) {
      err = 'Get Token Error: ' + error;
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
      }
    } catch (error) {
      console.error(error);
    }

  }
}
