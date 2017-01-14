import { Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {OnlySignedInUsers} from '../../core/guards/only-signed-in-users.guard';
import {OtherComponent} from './other.component';

export const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [OnlySignedInUsers] },
  { path: 'other', component: OtherComponent, canActivate: [OnlySignedInUsers] }
];
