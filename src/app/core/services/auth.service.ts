/**
 * Created by TrUnK on 06.01.2017.
 */
import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
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

@Injectable()
export class AuthService {

  constructor(private api: Api, private store: Store<AppState>, private router: Router) {}


  signIn(credentials: Credentials): Observable<string> {
    return this.api.signIn({
      'mobilePhone': credentials.phone,
      'password': credentials.password
    })
      .map((res: EmployeeSignInResponse) => {
        if (res.IsSuccess) {
          return res.LoginToken;
        } else {
          throw Error(`SignIn Error. Code: ${res.ErrorCode} Message: ${res.ErrorMessage}`);
        }
      });
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

  static storeToken(token) {
    if (!token) {return false;}

    try {
      localStorage.setItem(APP_CONFIG.LS_TOKEN_KEY, token);
    } catch (error) {
      console.error(error);
    }

  }
}
