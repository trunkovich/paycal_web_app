import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as _ from 'lodash';
import { Network } from '@ngx-pwa/offline';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { Event } from '@angular/router/src/events';
import { Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'pcl-internal',
  template: `
    <pcl-navigation [show]="showNav$ | async" [online]="online$ | async"></pcl-navigation>
    <router-outlet></router-outlet>
  `
})
export class InternalComponent implements OnInit {
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
  showNav$: Observable<boolean>;
  online$: Observable<boolean>;

  constructor(
    private router: Router,
    private network: Network
  ) {}

  ngOnInit(): void {
    this.online$ = this.network.onlineChanges;

    this.showNav$ = this.router.events
      .pipe(
        filter(val => val instanceof NavigationEnd),
        filter((val: NavigationEnd) =>
          val.urlAfterRedirects &&
          val.urlAfterRedirects.split('/').length &&
          val.urlAfterRedirects.split('/').length > 1
        ),
        map(val => !_.some(val.urlAfterRedirects.split('/'), _.partial(_.includes, this.navLessRoutes))),
        startWith(true)
      );
  }
}
