import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppState, profileSelectors } from '../../STATE/reducers/index';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs/operators';
import { merge as observableMerge } from 'rxjs';
import { Network } from '@ngx-pwa/offline';

@Injectable()
export class OnlyScheduledPersons implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private network: Network
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot
  ) {
    // WAITING FOR PROFILE RESOLVE OR ERROR.
    let profile$ = this.store.select(profileSelectors.getMyProfile)
      .pipe(
        map((profile) => { return { profile: profile }; })
      );
    let profileError$ = this.store.select(profileSelectors.getMyProfileErrorMsg)
      .pipe(
        map((error) => { return { error: error }; })
      );
    return observableMerge(profile$, profileError$)
      .pipe(
        filter((data: any) => {
          return data.profile || data.error;
        }),
        map((data: any) => {
          return !this.network.online || !data.error && data.profile.ScheduledPersonID !== null;
        }),
        tap((result) => {
          if (!result) {
            this.router.navigate(['/', 'search']);
          }
        })
      );
  }
}
