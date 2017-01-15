import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {AppState} from '../../../STATE/models/app-state.model';
import {SignInClearErrorAction, CompleteRegistrationAction} from '../../../STATE/actions/auth.actions';
import {ContinueRegistrationModel} from '../../../STATE/models/continue-registration.model';

@Component({
  selector: 'pcl-registration-step2',
  templateUrl: './registration-step2.component.html',
  styleUrls: ['./registration-step2.component.scss']
})
export class RegistrationStep2Component implements OnInit, OnDestroy {
  errorMsg$: Observable<string>;
  signInLoading$: Observable<boolean>;
  invitationCode: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) {}

  ngOnInit() {
    this.errorMsg$ = this.store.select(state => state.auth.errorMsg);
    this.signInLoading$ = this.store.select(state => state.auth.loading);
    if (this.route.snapshot.params['InvitationCode']) {
      this.invitationCode = this.route.snapshot.params['InvitationCode'];
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onSubmit(data) {
    let continueRegistrationData: ContinueRegistrationModel = {
      invitationCode: this.invitationCode,
      newPassword: data.newPassword
    };
    this.store.dispatch(new SignInClearErrorAction());
    this.store.dispatch(new CompleteRegistrationAction(continueRegistrationData));
  }
}
