import { Routes } from '@angular/router';

import { OnlySignedInUsers } from '../../core/guards/only-signed-in-users.guard';
import { OnlyMobileDevices } from '../../core/guards/only-mobile-devices.guard';
import { InternalComponent } from './internal.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { OnlyScheduledPersons } from '../../core/guards/only-scheduled-persons.guard';
import { QualifiedPhysiciansComponent } from './qualified-physicians/qualified-physicians.component';
import { MessageComponent } from './message/message.component';
import { MessageSuccessComponent } from './message-success/message-success.component';
import { MessageLoadingComponent } from './message-loading/message-loading.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CropAvatarComponent } from './crop-avatar/crop-avatar.component';
import { CropLoadingComponent } from './crop-loading/crop-loading.component';
import { searchRoutes } from './search-module/search.routes';
import { GoogleFormComponent } from './google-form/google-form.component';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';

export const internalRoutes: Routes = [
  { path: '', component: InternalComponent, canActivate: [OnlySignedInUsers, OnlyMobileDevices], children: [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent, canActivate: [OnlyScheduledPersons] },
    { path: 'qualified-physicians/:employeeScheduleEntryID', component: QualifiedPhysiciansComponent },
    { path: 'message/:employeeScheduleEntryID', component: MessageComponent },
    { path: 'message-success', component: MessageSuccessComponent },
    { path: 'message-loading', component: MessageLoadingComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'crop-avatar', component: CropAvatarComponent },
    { path: 'crop-loading', component: CropLoadingComponent },
    { path: 'create-schedule', component: CreateScheduleComponent },
    { path: 'form', component: GoogleFormComponent },
    { path: 'search', children: [...searchRoutes]}
  ] }
];
