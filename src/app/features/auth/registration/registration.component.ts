import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {AppState} from '../../../STATE/models/app-state.model';
import {SignInClearErrorAction, SaveLeadAction} from '../../../STATE/actions/auth.actions';
import {Region} from '../../../STATE/models/region.model';
import {State} from '../../../STATE/models/state.model';
import {Lead} from '../../../STATE/models/lead.model';
import {isMobile} from '../../../core/check-mobile';

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
  regions$: Observable<Region[]>;
  states$: Observable<State[]>;
  isMobile: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private store: Store<AppState>) {}

  ngOnInit() {
    this.registrationForm = this._fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/\d{3}-\d{3}-\d{4}/)]],
      regionID: [null, Validators.required],
      groupName: ['', Validators.required],
      stateID: [null, Validators.required]
    });
    this.errorMsg$ = this.store.select(state => state.auth.errorMsg);
    this.signInLoading$ = this.store.select(state => state.auth.loading);
    this.regions$ = this.store.select(state => state.references.regions);
    this.states$ = this.store.select(state => state.references.states);
    this.isMobile = isMobile;
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onSubmit(data: Lead) {
    data.phone = data.phone.replace(/\D+/g, '');
    this.store.dispatch(new SignInClearErrorAction());
    this.store.dispatch(new SaveLeadAction(data));
  }
}
