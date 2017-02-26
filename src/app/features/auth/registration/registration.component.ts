import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {SignInClearErrorAction, SaveLeadAction} from '../../../STATE/actions/auth.actions';
import {Region} from '../../../STATE/models/region.model';
import {State} from '../../../STATE/models/state.model';
import {Lead} from '../../../STATE/models/lead.model';
import {isMobile} from '../../../core/check-mobile';
import {AppState, authSelectors, referenceSelectors} from '../../../STATE/reducers/index';
import {TrackRegistrationFormLandedAction, TrackRegistrationFormSubmittedAction} from '../../../STATE/actions/mixpanel.actions';

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
    this.store.dispatch(new TrackRegistrationFormLandedAction());
    this.registrationForm = this._fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/\d{3}-\d{3}-\d{4}/)]],
      regionID: [null, Validators.required],
      groupName: ['', Validators.required],
      stateID: [null, Validators.required]
    });
    this.errorMsg$ = this.store.select(authSelectors.getAuthError);
    this.signInLoading$ = this.store.select(authSelectors.getAuthLoadingState);
    this.regions$ = this.store.select(referenceSelectors.getRegions);
    this.states$ = this.store.select(referenceSelectors.getStates);
    this.isMobile = isMobile;
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onSubmit(data: Lead) {
    this.store.dispatch(new TrackRegistrationFormSubmittedAction());
    data.phone = data.phone.replace(/\D+/g, '');
    this.store.dispatch(new SignInClearErrorAction());
    this.store.dispatch(new SaveLeadAction(data));
  }
}
