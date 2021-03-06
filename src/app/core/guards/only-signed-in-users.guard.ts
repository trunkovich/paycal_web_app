import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { SaveRedirectUrl } from '../../STATE/actions/auth.actions';
import { AppState, authSelectors } from '../../STATE/reducers/index';
import { tap } from 'rxjs/operators';

@Injectable()
export class OnlySignedInUsers implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot
  ) {
    return this.store.select(authSelectors.getAuthStatus)
      .pipe(
        tap((authenticated) => {
          if (!authenticated) {
            this.store.dispatch(new SaveRedirectUrl(stateSnapshot.url));
            this.router.navigate(['/', 'login']);
          }
        })
      );
  }
}
