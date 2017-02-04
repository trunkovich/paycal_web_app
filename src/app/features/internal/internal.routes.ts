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
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {CropAvatarComponent} from './crop-avatar/crop-avatar.component';

export const INTERNAL_ROUTES = Object.freeze({
  HOME: 'home',
  SEARCH: 'search',
  MORE: 'more',
  PROFILE: 'profile',
  EDIT_PROFILE: 'edit-profile',
  CROP_AVATAR: 'crop-avatar',
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
    { path: 'search', component: SearchComponent },
    { path: 'more', component: MoreComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'crop-avatar', component: CropAvatarComponent },
  ] }
];
