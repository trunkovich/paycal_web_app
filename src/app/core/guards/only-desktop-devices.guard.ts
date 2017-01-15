import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {isMobile} from '../check-mobile';
import {APP_CONFIG} from '../../../environments/environment';

@Injectable()
export class OnlyDesktopDevices implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot
  ) {
    if (!isMobile) {
      return true;
    } else {
      this.router.navigate(['/', 'home']);
      return false;
    }
  }
}
