/**
 * Created by TrUnK on 06.01.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as authActions from '../actions/auth.actions';
import {AuthService} from '../../core/services/auth.service';
import {Credentials} from '../models/credentials.model';


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
        .map((token: string) => new authActions.SignInSuccessAction(token))
        .catch(error => Observable.of(new authActions.SignInFailAction(error.message)));
    });

  @Effect({ dispatch: false })
  redirectAfterSuccessSignIn$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.SIGN_IN_SUCCESS)
    .do(() => this.authService.redirectAfterLogin());

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
  redirectAfterSuccessrequestPasswordRecovery$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.REQUEST_PASSWORD_RECOVERY_SUCCESS)
    .do(() => this.authService.redirectAfterPasswordRecoveryRequest());

  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGOUT)
    .do(() => this.authService.redirectToLogin());
}
