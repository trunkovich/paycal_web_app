import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { internalRoutes } from './internal.routes';
import { InternalComponent } from './internal.component';
import { PclCommonModule } from '../../common/pcl-common.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleEntryCardComponent } from './common/components/schedule-entry-card/schedule-entry-card.component';
import { CalendarComponent } from './common/components/calendar/calendar.component';
import { BottomSheetModule } from '../../bottom-sheet/bottom-sheet.module';
import { ViewTypeSwitcherComponent } from './common/components/view-type-switcher/view-type-switcher.component';
import { ViewTypeBottomSheetComponent } from './common/components/view-type-bottom-sheet/view-type-bottom-sheet.component';
import { ScheduleDayCardComponent } from './common/components/schedule-day-card/schedule-day-card.component';
import { QualifiedPhysiciansComponent } from './qualified-physicians/qualified-physicians.component';
import { MessageComponent } from './message/message.component';
import { MessageSuccessComponent } from './message-success/message-success.component';
import { MessageLoadingComponent } from './message-loading/message-loading.component';
import { QualifiedPhysiciansListComponent } from './qualified-physicians/qualifiend-physicians-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CropAvatarComponent } from './crop-avatar/crop-avatar.component';
import { CropLoadingComponent } from './crop-loading/crop-loading.component';
import { MasterScheduleCardComponent } from './common/components/master-schedule-card/master-schedule-card.component';
import { PhysicianPipe } from './common/pipes/physician.pipe';
import { ContactUsBottomSheetComponent } from './contact-us-bottom-sheet/contact-us-bottom-sheet.component';
import { ShiftCodeComponent } from './common/components/shift-code/shift-code.component';
import { NoEntriesFallbackComponent } from './common/components/no-entries-fallback/no-entries-fallback.component';
import { ContactPersonBottomSheetComponent } from './contact-person-bottom-sheet/contact-person-bottom-sheet.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    PclCommonModule,
    MaterialModule,
    MomentModule,
    BottomSheetModule,
    RouterModule.forChild(internalRoutes),
    ReactiveFormsModule,
    TextMaskModule
  ],
  exports: [
    CalendarComponent,
    ViewTypeSwitcherComponent,
    ViewTypeBottomSheetComponent,
    ScheduleEntryCardComponent,
    ScheduleDayCardComponent,
    MasterScheduleCardComponent,
    PhysicianPipe,
    NoEntriesFallbackComponent
  ],
  declarations: [
    InternalComponent,
    HomeComponent,
    ProfileComponent,
    ScheduleEntryCardComponent,
    CalendarComponent,
    ViewTypeSwitcherComponent,
    ViewTypeBottomSheetComponent,
    ScheduleDayCardComponent,
    QualifiedPhysiciansComponent,
    MessageComponent,
    MessageSuccessComponent,
    MessageLoadingComponent,
    QualifiedPhysiciansListComponent,
    EditProfileComponent,
    CropAvatarComponent,
    CropLoadingComponent,
    MasterScheduleCardComponent,
    PhysicianPipe,
    ContactUsBottomSheetComponent,
    ContactPersonBottomSheetComponent,
    ShiftCodeComponent,
    NoEntriesFallbackComponent
  ]
})
export class InternalModule { }
