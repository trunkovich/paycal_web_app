import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {AppState} from '../../../STATE/models/app-state.model';
import {SignInClearErrorAction} from '../../../STATE/actions/auth.actions';

@Component({
  selector: 'pcl-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorMsg$: Observable<string>;
  signInLoading$: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private store: Store<AppState>) {}

  ngOnInit() {
    this.registrationForm = this._fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/\d{3}-\d{3}-\d{4}/)]],
      regionId: [null, Validators.required],
      groupName: ['', Validators.required],
      stateId: [null, Validators.required]
    });
    this.errorMsg$ = this.store.select(state => state.auth.errorMsg);
    this.signInLoading$ = this.store.select(state => state.auth.loading);
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onSubmit(data) {
    // let credentials: Credentials = {
    //   phone: data.phone.replace(/\D+/g, ''),
    //   password: data.password,
    //   rememberMe: data.rememberMe
    // };
    this.store.dispatch(new SignInClearErrorAction());
    // this.store.dispatch(new SignInAction(credentials));
  }
}
