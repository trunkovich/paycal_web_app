import { Routes } from '@angular/router';
import {OnlyMobileComponent} from './core/components/only-mobile/only-mobile.component';
import {OnlyDesktopDevices} from './core/guards/only-desktop-devices.guard';

export const AppRoutes: Routes = [
  { path: 'only-mobile', component: OnlyMobileComponent, canActivate: [OnlyDesktopDevices] },
  { path: '**', pathMatch: 'full', redirectTo: '/home' },
];
