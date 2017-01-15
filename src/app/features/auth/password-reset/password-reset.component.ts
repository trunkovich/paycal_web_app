import {Component, OnInit, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {AppState} from '../../../STATE/models/app-state.model';
import {SignInClearErrorAction, ResetPasswordAction} from '../../../STATE/actions/auth.actions';
import {ActivatedRoute} from '@angular/router';
import {ResetPasswordModel} from '../../../STATE/models/reset-password.model';

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
    this.errorMsg$ = this.store.select(state => state.auth.errorMsg);
    this.signInLoading$ = this.store.select(state => state.auth.loading);
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
