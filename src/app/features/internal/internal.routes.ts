import { Routes } from '@angular/router';

import {OnlySignedInUsers} from '../../core/guards/only-signed-in-users.guard';
import {OnlyMobileDevices} from '../../core/guards/only-mobile-devices.guard';
import {InternalComponent} from './internal.component';
import {HomeComponent} from './home/home.component';
import {MoreComponent} from './more/more.component';
import {SearchComponent} from './search/search.component';
import {ProfileComponent} from './profile/profile.component';
import {OnlyScheduledPersons} from '../../core/guards/only-scheduled-persons.guard';
import {QualifiedPhysiciansComponent} from './qualified-physicians/qualified-physicians.component';
import {MessageComponent} from './message/message.component';
import {MessageSuccessComponent} from './message-success/message-success.component';
import {MessageLoadingComponent} from './message-loading/message-loading.component';

export const INTERNAL_ROUTES = Object.freeze({
  HOME: 'home',
  SEARCH: 'search',
  MORE: 'more',
  PROFILE: 'profile',
  QUALIFIED_PHYSICIANS: 'qualified-physicians',
  MESSAGE: 'message',
  MESSAGE_SUCCESS: 'message-success',
  MESSAGE_LOADING: 'message-loading'
});

export const internalRoutes: Routes = [
  { path: '', component: InternalComponent, canActivate: [OnlySignedInUsers, OnlyMobileDevices], children: [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent, canActivate: [OnlyScheduledPersons] },
    { path: 'qualified-physicians/:employeeScheduleEntryID', component: QualifiedPhysiciansComponent },
    { path: 'message/:employeeScheduleEntryID', component: MessageComponent },
    { path: 'message-success', component: MessageSuccessComponent },
    { path: 'message-loading', component: MessageLoadingComponent },
    { path: 'search', component: SearchComponent, canActivate: [] },
    { path: 'more', component: MoreComponent, canActivate: [] },
    { path: 'profile', component: ProfileComponent, canActivate: [] },
  ] }
];
