/**
 * Created by TrUnK on 06.01.2017.
 */
import {Injectable} from "@angular/core";
import {EmployeeSignInResponse} from "../../STATE/models/responses/employee-sign-in-response.model";
import {Credentials} from "../../STATE/models/credentials.model";
import {Observable} from "rxjs";
import {APP_CONFIG} from "../../../environments/environment";
import {Employee} from "../../STATE/models/employee.model";
import {EmployeeResponse} from "../../STATE/models/responses/employee-response.model";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {AppState} from "../../STATE/models/app-state.model";
import {Api} from "../../STATE/actions/api.service";
import {TokenObject} from "../../STATE/models/token.model";
import {Response} from "../../STATE/models/responses/response.model";

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

  redirectAfterPasswordRecoveryRequest() {
    this.router.navigate(['/', 'forgot-password-success'])
  }

  redirectToLogin() {
    this.router.navigate(['/', 'login'])
  }

  redirectAfterLogin() {
    this.store.select((state) => state.auth.redirectUrl)
      .first()
      .subscribe((url) => {
        this.router.navigateByUrl(url || APP_CONFIG.DEFAULT_REDIRECT_URL)
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
    if (!tokenObj || !tokenObj.token) {return false;}

    try {
      if(tokenObj.rememberMe) {
        localStorage.setItem(APP_CONFIG.LS_TOKEN_KEY, tokenObj.token);
      } else {
        localStorage.removeItem(APP_CONFIG.LS_TOKEN_KEY);
      }
    } catch (error) {
      console.error(error);
    }

  }
}
