import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SignInAction, SignInClearErrorAction } from '../../../STATE/actions/auth.actions';
import { Credentials } from '../../../STATE/models/credentials.model';
import { AppState, authSelectors } from '../../../STATE/reducers/index';

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
    private store: Store<AppState>) {
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

  onSubmit(data) {
    let credentials: Credentials = {
      phone: data.phone.replace(/\D+/g, ''),
      password: data.password,
      rememberMe: data.rememberMe
    };
    if (!this.disableTerms) {
      localStorage.setItem('terms-signed', 'true');
    }
    this.store.dispatch(new SignInClearErrorAction());
    this.store.dispatch(new SignInAction(credentials));
  }

  togglePassword(el: HTMLElement) {
    this.showPassword = !this.showPassword;
    el.setAttribute('type', this.getType());
  }

  private getType() {
    return this.showPassword ? 'text' : 'password';
  }

}
