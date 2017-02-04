import { Component } from '@angular/core';
import {ActivatedRoute, RouterState, Router, NavigationEnd} from '@angular/router';
import {INTERNAL_ROUTES} from './internal.routes';

@Component({
  selector: 'pcl-internal',
  template: `
    <pcl-navigation [show]="showNav"></pcl-navigation>
    <router-outlet></router-outlet>
  `
})
export class InternalComponent {
  navLessRoutes = [
    INTERNAL_ROUTES.QUALIFIED_PHYSICIANS,
    INTERNAL_ROUTES.MESSAGE,
    INTERNAL_ROUTES.MESSAGE_LOADING,
    INTERNAL_ROUTES.MESSAGE_SUCCESS,
    INTERNAL_ROUTES.CROP_AVATAR
  ];
  showNav: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (
          val.urlAfterRedirects &&
          val.urlAfterRedirects.split('/').length &&
          val.urlAfterRedirects.split('/').length > 1 &&
          this.navLessRoutes.indexOf(val.urlAfterRedirects.split('/')[1]) >= 0
        ) {
          this.showNav = false;
        } else {
          this.showNav = true;
        }
      }
    });
  }
}
