import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {Employee} from '../../../STATE/models/employee.model';
import {AppState, profileSelectors} from '../../../STATE/reducers/index';
import {LogoutAction} from '../../../STATE/actions/auth.actions';
import {Router} from '@angular/router';
import {AUTH_ROUTES} from '../../auth/auth.routes';

@Component({
  selector: 'pcl-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: Employee;
  sub: Subscription;

  constructor(private _location: Location, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.sub = this.store.select(profileSelectors.getMyProfile)
      .subscribe(employee => this.profile = employee);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onBackBtnClick() {
    this._location.back();
  }

  onNextBtnClick() {
    console.log('next');
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

  getName(profile: Employee): string {
    if (!profile) {
      return '';
    } else {
      return `${profile.FirstName || ''} ${profile.LastName || ''}`;
    }
  }
}
