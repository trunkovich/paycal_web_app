import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppState, profileSelectors } from '../../STATE/reducers/index';
import { Store } from '@ngrx/store';

@Injectable()
export class OnlyScheduledPersons implements CanActivate {

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot
  ) {
    // WAITING FOR PROFILE RESOLVE OR ERROR.
    let profile$ = this.store.select(profileSelectors.getMyProfile)
      .map((profile) => { return { profile: profile }; });
    let profileError$ = this.store.select(profileSelectors.getMyProfileErrorMsg)
      .map((error) => { return { error: error }; });
    return profile$.merge(profileError$)
      .filter((data: any) => {
        return data.profile || data.error;
      })
      .map((data: any) => {
        return !data.error && data.profile.ScheduledPersonID !== null;
      })
      .do((result) => {
        if (!result) {
          this.router.navigate(['/', 'search']);
        }
      });
  }
}
