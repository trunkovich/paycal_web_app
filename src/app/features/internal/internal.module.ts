import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {MomentModule} from 'angular2-moment';

import {internalRoutes} from './internal.routes';
import {InternalComponent} from './internal.component';
import {PclCommonModule} from '../../common/pcl-common.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MoreComponent } from './more/more.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleEntryCardComponent } from './common/components/schedule-entry-card/schedule-entry-card.component';
import { CalendarComponent } from './common/components/calendar/calendar.component';
import { CalendarDataToArrayPipe } from './common/components/calendar/calendar-data-to-array.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    PclCommonModule,
    MaterialModule,
    MomentModule,
    RouterModule.forChild(internalRoutes),
  ],
  declarations: [
    InternalComponent,
    HomeComponent,
    SearchComponent,
    MoreComponent,
    ProfileComponent,
    ScheduleEntryCardComponent,
    CalendarComponent,
    CalendarDataToArrayPipe
  ]
})
export class InternalModule { }
