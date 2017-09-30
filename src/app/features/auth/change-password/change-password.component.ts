import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';

import { ChangePasswordAction, SignInClearErrorAction } from '../../../STATE/actions/auth.actions';
import { AppState, authSelectors } from '../../../STATE/reducers/index';

@Component({
  selector: 'pcl-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  errorMsg$: Observable<string>;
  signInLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private _location: Location) {}

  ngOnInit() {
    this.errorMsg$ = this.store.select(authSelectors.getAuthError);
    this.signInLoading$ = this.store.select(authSelectors.getAuthLoadingState);
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onBackBtnClick() {
    this._location.back();
  }

  onSubmit(data) {
    this.store.dispatch(new SignInClearErrorAction());
    this.store.dispatch(new ChangePasswordAction(data.newPassword));
  }
}
