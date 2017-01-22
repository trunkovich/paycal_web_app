import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {SignInClearErrorAction, RequestPasswordRecoveryAction} from '../../../STATE/actions/auth.actions';
import {AUTH_ROUTES} from '../auth.routes';
import {AppState, authSelectors} from '../../../STATE/reducers/index';

@Component({
  selector: 'pcl-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  phoneForm: FormGroup;
  mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorMsg$: Observable<string>;
  signInLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.phoneForm = this._fb.group({
      phone: ['', [Validators.required, Validators.pattern(/\d{3}-\d{3}-\d{4}/)]]
    });
    this.errorMsg$ = this.store.select(authSelectors.getAuthError);
    this.signInLoading$ = this.store.select(authSelectors.getAuthLoadingState);
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onBackBtnClick($event: MouseEvent) {
    this.router.navigate(['/', AUTH_ROUTES.LOGIN]);
  }

  onSubmit(data) {
    let phone: string = data.phone.replace(/\D+/g, '');
    this.store.dispatch(new SignInClearErrorAction());
    this.store.dispatch(new RequestPasswordRecoveryAction(phone));
  }

}
