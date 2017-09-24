import { Routes } from '@angular/router';

import { SearchComponent } from './search.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

export const searchRoutes: Routes = [
  { path: '', pathMatch: 'full', component: SearchComponent },
  { path: 'physicians/:id/profile', component: EmployeeProfileComponent },
  { path: ':type', component: SearchListComponent },
  { path: ':type/:id', component: ScheduleComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/search' },
];
