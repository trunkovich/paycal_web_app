import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import * as _ from 'lodash';

import {INTERNAL_ROUTES} from './internal.routes';
import {SEARCH_ROUTES} from './search-module/search.routes';

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
    INTERNAL_ROUTES.CROP_AVATAR,
    INTERNAL_ROUTES.EDIT_PROFILE,
    INTERNAL_ROUTES.CROP_LOADING,
    SEARCH_ROUTES.SEARCH_CALL,
    SEARCH_ROUTES.SEARCH_OR,
    SEARCH_ROUTES.SEARCH_PHYSICIANS
  ];
  showNav: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (
          val.urlAfterRedirects &&
          val.urlAfterRedirects.split('/').length &&
          val.urlAfterRedirects.split('/').length > 1 &&
          _.some(val.urlAfterRedirects.split('/'), _.partial(_.includes, this.navLessRoutes))
        ) {
          this.showNav = false;
        } else {
          this.showNav = true;
        }
      }
    });
  }
}
