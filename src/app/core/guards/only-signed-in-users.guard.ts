import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';

import {AppState} from '../../STATE/models/app-state.model';
import {SaveRedirectUrl} from '../../STATE/actions/auth.actions';
import {AUTH_ROUTES} from '../../features/auth/auth.routes';

@Injectable()
export class OnlySignedInUsers implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot
  ) {
    return this.store.select(state => state.auth.authenticated)
      .do((authenticated) => {
        if (!authenticated) {
          this.store.dispatch(new SaveRedirectUrl(stateSnapshot.url));
          this.router.navigate(['/', AUTH_ROUTES.LOGIN]);
        }
      });
  }
}
