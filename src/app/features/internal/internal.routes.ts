import { Routes } from '@angular/router';

import {OnlySignedInUsers} from '../../core/guards/only-signed-in-users.guard';
import {OnlyMobileDevices} from '../../core/guards/only-mobile-devices.guard';
import {InternalComponent} from './internal.component';
import {HomeComponent} from './home/home.component';
import {MoreComponent} from './more/more.component';
import {SearchComponent} from './search/search.component';
import {ProfileComponent} from './profile/profile.component';

export const internalRoutes: Routes = [
  { path: '', component: InternalComponent, canActivate: [OnlySignedInUsers, OnlyMobileDevices], children: [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent, canActivate: [] },
    { path: 'search', component: SearchComponent, canActivate: [] },
    { path: 'more', component: MoreComponent, canActivate: [] },
    { path: 'profile', component: ProfileComponent, canActivate: [] },
  ] }
];
