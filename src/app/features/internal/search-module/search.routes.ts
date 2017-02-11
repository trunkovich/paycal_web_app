import { Routes } from '@angular/router';

import {OnlySignedInUsers} from '../../../core/guards/only-signed-in-users.guard';
import {OnlyMobileDevices} from '../../../core/guards/only-mobile-devices.guard';
import {SearchComponent} from './search.component';
import {InternalComponent} from '../internal.component';
import {SearchListComponent} from './search-list/search-list.component';

export const SEARCH_ROUTES = Object.freeze({
  SEARCH: 'search'
});

export const searchRoutes: Routes = [
  { path: '', component: InternalComponent, canActivate: [OnlySignedInUsers, OnlyMobileDevices], children: [
    { path: 'search', children: [
      { path: '', pathMatch: 'full', component: SearchComponent },
      { path: ':type', component: SearchListComponent },
      { path: '**', pathMatch: 'full', redirectTo: '/search' },
    ] }
  ] }
];
