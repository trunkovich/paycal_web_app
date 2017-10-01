import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'pcl-internal',
  template: `
    <pcl-navigation [show]="showNav"></pcl-navigation>
    <router-outlet></router-outlet>
  `
})
export class InternalComponent {
  navLessRoutes = [
    'qualified-physicians',
    'message',
    'message-loading',
    'message-success',
    'crop-avatar',
    'edit-profile',
    'crop-loading',
    'call-reference',
    'or-reference',
    'physicians',
    'create-schedule'
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
