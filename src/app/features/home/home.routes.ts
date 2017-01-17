import { Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {OnlySignedInUsers} from '../../core/guards/only-signed-in-users.guard';
import {OtherComponent} from './other.component';
import {OnlyMobileDevices} from '../../core/guards/only-mobile-devices.guard';

export const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [OnlySignedInUsers, OnlyMobileDevices] },
  { path: 'other', component: OtherComponent, canActivate: [] }
];
