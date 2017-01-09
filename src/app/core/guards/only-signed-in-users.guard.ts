import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../STATE/models/app-state.model";
import {Injectable} from "@angular/core";
import {SaveRedirectUrl} from "../../STATE/actions/auth.actions";

@Injectable()
export class OnlySignedInUsers implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.store.select((state) => state.auth.authenticated)
      .do((authenticated) => {
        if (!authenticated) {
          this.store.dispatch(new SaveRedirectUrl(state.url));
          this.router.navigate(['/', 'login'])
        }
      });
  }
}
