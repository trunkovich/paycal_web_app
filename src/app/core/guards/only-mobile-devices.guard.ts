import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {isMobile} from '../check-mobile';

@Injectable()
export class OnlyMobileDevices implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot
  ) {
    if (isMobile) {
      return true;
    } else {
      this.router.navigate(['/', 'only-mobile']);
      return false;
    }
  }
}
