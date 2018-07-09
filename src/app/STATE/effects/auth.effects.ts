/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import * as Raven from 'raven-js';

import * as authActions from '../actions/auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { Credentials } from '../models/credentials.model';
import { ResetPasswordModel } from '../models/reset-password.model';
import { CompleteRegistrationModel } from '../models/complete-registration.model';
import { TokenObject } from '../models/token.model';
import { Lead } from '../models/lead.model';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  @Effect()
  signIn$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN)
    .pipe(
      map((action: authActions.SignInAction) => action.payload),
      switchMap((credentials: Credentials) =>
        this.authService.signIn(credentials)
          .pipe(
            map((tokenObject: TokenObject) => new authActions.SignInSuccessAction(tokenObject)),
            catchError(error => observableOf(new authActions.SignInFailAction(error.message)))
          )
      )
    );

  @Effect()
  saveLead$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SAVE_LEAD)
    .pipe(
      map((action: authActions.SaveLeadAction) => action.payload),
      switchMap((data: Lead) =>
        this.authService.saveLead(data)
          .pipe(
            map(() => new authActions.SaveLeadSuccessAction()),
            catchError(error => observableOf(new authActions.SaveLeadFailAction(error.message)))
          )
      )
    );

  @Effect()
  completeRegistration$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.COMPLETE_REGISTRATION)
    .pipe(
      map((action: authActions.CompleteRegistrationAction) => action.payload),
      switchMap((completeRegistrationData: CompleteRegistrationModel) =>
        this.authService.continueRegistration(completeRegistrationData)
          .pipe(
            map((tokenObject: TokenObject) => new authActions.CompleteRegistrationSuccessAction(tokenObject)),
            catchError(error => observableOf(new authActions.CompleteRegistrationFailAction(error.message)))
          )
      )
    );

  @Effect({ dispatch: false })
  redirectAfterSuccessCompleteRegistration$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.COMPLETE_REGISTRATION_SUCCESS)
    .pipe(
      tap(() => this.authService.redirectAfterCompleteRegistration())
    );

  @Effect({ dispatch: false })
  redirectAfterSuccessSignIn$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN_SUCCESS)
    .pipe(
      tap(() => {
        Raven.captureBreadcrumb({
          message: 'Sign in success effect',
          category: 'Sign-in',
          level: 'debug'
        });
      }),
      tap(() => this.authService.redirectAfterLogin())
    );

  @Effect({ dispatch: false })
  redirectAfterSuccessSaveLead$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SAVE_LEAD_SUCCESS)
    .pipe(
      tap(() => this.authService.redirectAfterSaveLead())
    );

  @Effect({ dispatch: false })
  storeTokenAfterSuccessSignIn$ = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN_SUCCESS)
    .pipe(
      map((action: authActions.SignInSuccessAction) => action.payload),
      tap((token) => AuthService.storeToken(token))
    );

  @Effect()
  getUserFromLS$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.READ_TOKEN)
    .pipe(
      switchMap(() =>
        AuthService.readToken()
          .pipe(
            map((token) => new authActions.ReadTokenSuccessAction(token)),
            catchError(error => observableOf(new authActions.ReadTokenFailAction(error)))
          )
      )
    );

  @Effect()
  requestPasswordRecovery$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY)
    .pipe(
      map((action: authActions.RequestPasswordRecoveryAction) => action.payload),
      switchMap((phone: string) =>
        this.authService.requestPasswordRecovery(phone)
          .pipe(
            map(() => new authActions.RequestPasswordRecoverySuccessAction()),
            catchError(error => observableOf(new authActions.RequestPasswordRecoveryFailAction(error.message)))
          )
      )
    );

  @Effect({ dispatch: false })
  redirectAfterSuccessRequestPasswordRecovery$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY_SUCCESS)
    .pipe(
      tap(() => this.authService.redirectAfterPasswordRecoveryRequest())
    );

  @Effect({ dispatch: false })
  redirectAfterSuccessChangePassword$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.CHANGE_PASSWORD_SUCCESS)
    .pipe(
      tap(() => this.authService.redirectAfterChangePassword())
    );

  @Effect()
  resetPassword$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.RESET_PASSWORD)
    .pipe(
      map((action: authActions.ResetPasswordAction) => action.payload),
      switchMap((resetPasswordData: ResetPasswordModel) =>
        this.authService.resetPassword(resetPasswordData)
          .pipe(
            map(() => new authActions.ResetPasswordSuccessAction()),
            catchError(error => observableOf(new authActions.ResetPasswordFailAction(error.message)))
          )
      )
    );

  @Effect()
  changePassword$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.CHANGE_PASSWORD)
    .pipe(
      map((action: authActions.ChangePasswordAction) => action.payload),
      switchMap((password: string) =>
        this.authService.changePassword(password)
          .pipe(
            map(() => new authActions.ChangePasswordSuccessAction()),
            catchError(error => observableOf(new authActions.ChangePasswordFailAction(error.message)))
          )
      )
    );

  @Effect({ dispatch: false })
  redirectAfterSuccessResetPassword$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.RESET_PASSWORD_SUCCESS)
    .pipe(
      tap(() => this.authService.redirectAfterResetPassword())
    );


  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGOUT)
    .pipe(
      tap(() => Raven.setUserContext({})),
      tap(() => this.authService.logout())
    );
}
