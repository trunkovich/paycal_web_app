import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { ResetPasswordAction, SignInClearErrorAction } from '../../../STATE/actions/auth.actions';
import { ResetPasswordModel } from '../../../STATE/models/reset-password.model';
import { AppState, authSelectors } from '../../../STATE/reducers/index';

@Component({
  selector: 'pcl-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  errorMsg$: Observable<string>;
  signInLoading$: Observable<boolean>;
  resetPasswordCode: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) {}

  ngOnInit() {
    this.errorMsg$ = this.store.select(authSelectors.getAuthError);
    this.signInLoading$ = this.store.select(authSelectors.getAuthLoadingState);
    if (this.route.snapshot.params['ResetPasswordCode']) {
      this.resetPasswordCode = this.route.snapshot.params['ResetPasswordCode'];
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onSubmit(data) {
    let resetPasswordData: ResetPasswordModel = {
      passwordResetCode: this.resetPasswordCode,
      newPassword: data.newPassword
    };
    this.store.dispatch(new SignInClearErrorAction());
    this.store.dispatch(new ResetPasswordAction(resetPasswordData));
  }
}
