import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {Employee} from '../../../STATE/models/employee.model';
import {AppState, profileSelectors} from '../../../STATE/reducers/index';
import {LogoutAction} from '../../../STATE/actions/auth.actions';
import {Router} from '@angular/router';
import {AUTH_ROUTES} from '../../auth/auth.routes';
import {INTERNAL_ROUTES} from '../internal.routes';

@Component({
  selector: 'pcl-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: Employee;
  sub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.sub = this.store.select(profileSelectors.getMyProfile)
      .subscribe(employee => this.profile = employee);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onNextBtnClick() {
    // Set timeout for ripple animation
    setTimeout(() => this.router.navigate(['/', INTERNAL_ROUTES.EDIT_PROFILE]), 200);
  }

  onLogoutClick() {
    // Set timeout for ripple animation
    setTimeout(() => this.store.dispatch(new LogoutAction()), 200);
  }

  onChangePasswordClick() {
    // Set timeout for ripple animation
    setTimeout(() => this.router.navigate(['/', AUTH_ROUTES.CHANGE_PASSWORD]), 200);
  }

  getPhotoUrl(profile: Employee): string {
    if (!profile || !profile.PhotoUrl) {
      return '';
    } else {
      return `url(${profile.PhotoUrl})`;
    }
  }

  getEmployeeName(profile: Employee): string {
    if (!profile) {
      return '';
    } else {
      return `${profile.FirstName || ''} ${profile.LastName || ''}`;
    }
  }
}
