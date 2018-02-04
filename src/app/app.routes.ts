import { Routes } from '@angular/router';
import { OnlyDesktopDevices } from './core/guards/only-desktop-devices.guard';
import { OnlyMobileComponent } from './core/components/only-mobile/only-mobile.component';

export const AppRoutes: Routes = [
  { path: 'only-mobile', component: OnlyMobileComponent, canActivate: [OnlyDesktopDevices] },
  // { path: '**', pathMatch: 'full', redirectTo: '/home' },
];
