/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Raven from 'raven-js';

import * as authActions from '../actions/auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { Credentials } from '../models/credentials.model';
import { ResetPasswordModel } from '../models/reset-password.model';
import { CompleteRegistrationModel } from '../models/complete-registration.model';
import { TokenObject } from '../models/token.model';
import { Lead } from '../models/lead.model';


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  @Effect()
  signIn$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN)
    .map(toPayload)
    .switchMap((credentials: Credentials) => {
      return this.authService.signIn(credentials)
        .map((tokenObject: TokenObject) => new authActions.SignInSuccessAction(tokenObject))
        .catch(error => Observable.of(new authActions.SignInFailAction(error.message)));
    });

  @Effect()
  saveLead$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SAVE_LEAD)
    .map(toPayload)
    .switchMap((data: Lead) => {
      return this.authService.saveLead(data)
        .map(() => new authActions.SaveLeadSuccessAction())
        .catch(error => Observable.of(new authActions.SaveLeadFailAction(error.message)));
    });

  @Effect()
  completeRegistration$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.COMPLETE_REGISTRATION)
    .map(toPayload)
    .switchMap((completeRegistrationData: CompleteRegistrationModel) => {
      return this.authService.continueRegistration(completeRegistrationData)
        .map((tokenObject: TokenObject) => new authActions.CompleteRegistrationSuccessAction(tokenObject))
        .catch(error => Observable.of(new authActions.CompleteRegistrationFailAction(error.message)));
    });

  @Effect({ dispatch: false })
  redirectAfterSuccessCompleteRegistration$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS)
    .do(() => this.authService.redirectAfterCompleteRegistration());

  @Effect({ dispatch: false })
  redirectAfterSuccessSignIn$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN_SUCCESS)
    .do(() => this.authService.redirectAfterLogin());

  @Effect({ dispatch: false })
  redirectAfterSuccessSaveLead$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SAVE_LEAD_SUCCESS)
    .do(() => this.authService.redirectAfterSaveLead());

  @Effect({ dispatch: false })
  storeTokenAfterSuccessSignIn$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN_SUCCESS)
    .map(toPayload)
    .do((token) => AuthService.storeToken(token));

  @Effect()
  getUserFromLS$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.READ_TOKEN)
    .startWith(new authActions.ReadTokenAction())
    .switchMap(() => {
      return AuthService.readToken()
        .map((token) => new authActions.ReadTokenSuccessAction(token))
        .catch(error => Observable.of(new authActions.ReadTokenFailAction(error)));
    });

  @Effect()
  requestPasswordRecovery$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY)
    .map(toPayload)
    .switchMap((phone: string) => {
      return this.authService.requestPasswordRecovery(phone)
        .map(() => new authActions.RequestPasswordRecoverySuccessAction())
        .catch(error => Observable.of(new authActions.RequestPasswordRecoveryFailAction(error.message)));
    });

  @Effect({ dispatch: false })
  redirectAfterSuccessRequestPasswordRecovery$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY_SUCCESS)
    .do(() => this.authService.redirectAfterPasswordRecoveryRequest());

  @Effect({ dispatch: false })
  redirectAfterSuccessChangePassword$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.CHANGE_PASSWORD_SUCCESS)
    .do(() => this.authService.redirectAfterChangePassword());

  @Effect()
  resetPassword$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.RESET_PASSWORD)
    .map(toPayload)
    .switchMap((resetPasswordData: ResetPasswordModel) => {
      return this.authService.resetPassword(resetPasswordData)
        .map(() => new authActions.ResetPasswordSuccessAction())
        .catch(error => Observable.of(new authActions.ResetPasswordFailAction(error.message)));
    });

  @Effect()
  changePassword$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.CHANGE_PASSWORD)
    .map(toPayload)
    .switchMap((password: string) => {
      return this.authService.changePassword(password)
        .map(() => new authActions.ChangePasswordSuccessAction())
        .catch(error => Observable.of(new authActions.ChangePasswordFailAction(error.message)));
    });

  @Effect({ dispatch: false })
  redirectAfterSuccessResetPassword$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.RESET_PASSWORD_SUCCESS)
    .do(() => this.authService.redirectAfterResetPassword());


  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGOUT)
    .do(() => Raven.setUserContext({}))
    .do(() => this.authService.logout());
}
