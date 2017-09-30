/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
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

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  @Effect()
  signIn$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN)
    .map((action: authActions.SignInAction) => action.payload)
    .switchMap((credentials: Credentials) => {
      return this.authService.signIn(credentials)
        .map((tokenObject: TokenObject) => new authActions.SignInSuccessAction(tokenObject))
        .catch(error => {
          return Observable.of(new authActions.SignInFailAction(error.message));
        });
    });

  @Effect()
  saveLead$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SAVE_LEAD)
    .map((action: authActions.SaveLeadAction) => action.payload)
    .switchMap((data: Lead) => {
      return this.authService.saveLead(data)
        .map(() => new authActions.SaveLeadSuccessAction())
        .catch(error => Observable.of(new authActions.SaveLeadFailAction(error.message)));
    });

  @Effect()
  completeRegistration$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.COMPLETE_REGISTRATION)
    .map((action: authActions.CompleteRegistrationAction) => action.payload)
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
    .do(() => {
      Raven.captureBreadcrumb({
        message: 'Sign in success effect',
        category: 'Sign-in',
        level: 'debug'
      });
    })
    .do(() => this.authService.redirectAfterLogin());

  @Effect({ dispatch: false })
  redirectAfterSuccessSaveLead$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SAVE_LEAD_SUCCESS)
    .do(() => this.authService.redirectAfterSaveLead());

  @Effect({ dispatch: false })
  storeTokenAfterSuccessSignIn$ = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN_SUCCESS)
    .map((action: authActions.SignInSuccessAction) => action.payload)
    .do((token) => AuthService.storeToken(token));

  @Effect()
  getUserFromLS$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.READ_TOKEN)
    .switchMap(() => {
      return AuthService.readToken()
        .map((token) => new authActions.ReadTokenSuccessAction(token))
        .catch(error => Observable.of(new authActions.ReadTokenFailAction(error)));
    });

  @Effect()
  requestPasswordRecovery$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY)
    .map((action: authActions.RequestPasswordRecoveryAction) => action.payload)
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
    .map((action: authActions.ResetPasswordAction) => action.payload)
    .switchMap((resetPasswordData: ResetPasswordModel) => {
      return this.authService.resetPassword(resetPasswordData)
        .map(() => new authActions.ResetPasswordSuccessAction())
        .catch(error => Observable.of(new authActions.ResetPasswordFailAction(error.message)));
    });

  @Effect()
  changePassword$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.CHANGE_PASSWORD)
    .map((action: authActions.ChangePasswordAction) => action.payload)
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
