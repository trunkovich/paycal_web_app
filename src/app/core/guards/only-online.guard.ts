import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { Network } from '@ngx-pwa/offline';

@Injectable()
export class OnlyOnlineGuard implements CanActivate {

  constructor(private router: Router, private network: Network) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot
  ) {
    return this.network.online;
  }
}
