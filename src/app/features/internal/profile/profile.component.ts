import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Employee } from '../../../STATE/models/employee.model';
import { AppState, profileSelectors } from '../../../STATE/reducers/index';
import { LogoutAction } from '../../../STATE/actions/auth.actions';

@Component({
  selector: 'pcl-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: Employee;
  sub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.sub = this.store.select(profileSelectors.getMyProfile)
      .subscribe(employee => {
        this.profile = employee;
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onNextBtnClick() {
    // Set timeout for ripple animation
    setTimeout(() => this.router.navigate(['/', 'edit-profile']), 200);
  }

  onLogoutClick() {
    // Set timeout for ripple animation
    setTimeout(() => this.store.dispatch(new LogoutAction()), 200);
  }

  onChangePasswordClick() {
    // Set timeout for ripple animation
    setTimeout(() => this.router.navigate(['/', 'change-password']), 200);
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
