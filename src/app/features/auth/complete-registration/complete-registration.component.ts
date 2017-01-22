import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {SignInClearErrorAction, CompleteRegistrationAction} from '../../../STATE/actions/auth.actions';
import {CompleteRegistrationModel} from '../../../STATE/models/complete-registration.model';
import {authSelectors, AppState} from '../../../STATE/reducers/index';

@Component({
  selector: 'pcl-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent implements OnInit, OnDestroy {
  errorMsg$: Observable<string>;
  signInLoading$: Observable<boolean>;
  invitationCode: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) {}

  ngOnInit() {
    this.errorMsg$ = this.store.select(authSelectors.getAuthError);
    this.signInLoading$ = this.store.select(authSelectors.getAuthLoadingState);
    if (this.route.snapshot.params['InvitationCode']) {
      this.invitationCode = this.route.snapshot.params['InvitationCode'];
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new SignInClearErrorAction());
  }

  onSubmit(data) {
    let completeRegistrationData: CompleteRegistrationModel = {
      invitationCode: this.invitationCode,
      newPassword: data.newPassword
    };
    this.store.dispatch(new SignInClearErrorAction());
    this.store.dispatch(new CompleteRegistrationAction(completeRegistrationData));
  }
}
