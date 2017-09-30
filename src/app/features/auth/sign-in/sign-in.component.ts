import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MdDialog } from '@angular/material';

import { SignInAction, SignInClearErrorAction } from '../../../STATE/actions/auth.actions';
import { Credentials } from '../../../STATE/models/credentials.model';
import { AppState, authSelectors } from '../../../STATE/reducers/index';
import { markInvalidFieldsAsTouched } from '../../../STATE/utils';
import { LocalStorageAlertComponent } from '../local-storage-alert/local-storage-alert.component';

@Component({
  selector: 'pcl-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  showPassword: boolean = false;
  errorMsg$: Observable<string>;
  signInLoading$: Observable<boolean>;
  disableTerms: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private store: Store<AppState>,
    public dialog: MdDialog
  ) {
    this.disableTerms = !!localStorage.getItem('terms-signed');
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      phone: ['', [Validators.required, Validators.pattern(/\d{3}-\d{3}-\d{4}/)]],
      password: ['', Validators.required],
      rememberMe: [true, Validators.required],
      terms: [{value: this.disableTerms, disabled: this.disableTerms}, Validators.requiredTrue]
    });
    this.errorMsg$ = this.store.select(authSelectors.getAuthError);
    this.signInLoading$ = this.store.select(authSelectors.getAuthLoadingState);
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      markInvalidFieldsAsTouched(form);
    } else {
      let credentials: Credentials = {
        phone: form.value.phone.replace(/\D+/g, ''),
        password: form.value.password,
        rememberMe: form.value.rememberMe
      };
      if (!this.disableTerms) {
        try {
          localStorage.setItem('terms-signed', 'true');
        } catch (err) {
          if (err.name === 'QuotaExceededError') {
            this.dialog.open(LocalStorageAlertComponent);
          }
        }
      }
      this.store.dispatch(new SignInClearErrorAction());
      this.store.dispatch(new SignInAction(credentials));
    }
  }

  togglePassword(el: HTMLElement) {
    this.showPassword = !this.showPassword;
    el.setAttribute('type', this.getType());
  }

  private getType() {
    return this.showPassword ? 'text' : 'password';
  }

}
