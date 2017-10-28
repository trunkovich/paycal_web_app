import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { GoogleFormComponent } from './google-form/google-form.component';
import { CustomMaterialModule } from '../../custom-material.module';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { IntroductionComponent } from './create-schedule/introduction/introduction.component';
import { ScheduleStep1Component } from './create-schedule/schedule-step-1/schedule-step-1.component';
import { ScheduleStep2Component } from './create-schedule/schedule-step-2/schedule-step-2.component';
import { ScheduleStep3Component } from './create-schedule/schedule-step-3/schedule-step-3.component';
import { ScheduleStep4Component } from './create-schedule/schedule-step-4/schedule-step-4.component';
import { ScheduleStep5Component } from './create-schedule/schedule-step-5/schedule-step-5.component';
import { ScheduleStep6Component } from './create-schedule/schedule-step-6/schedule-step-6.component';
import { ScheduleStep7Component } from './create-schedule/schedule-step-7/schedule-step-7.component';
import { ScheduleStep8Component } from './create-schedule/schedule-step-8/schedule-step-8.component';
import { ScheduleStep9Component } from './create-schedule/schedule-step-9/schedule-step-9.component';
import { ScheduleStep10Component } from './create-schedule/schedule-step-10/schedule-step-10.component';
import { ScheduleStep11Component } from './create-schedule/schedule-step-11/schedule-step-11.component';
import { SelectMonthForSchedulingComponent } from './select-month-for-scheduling/select-month-for-scheduling.component';
import { CustomDateSelectorComponent } from './common/components/custom-date-selector/custom-date-selector.component';
import { DialogCalendarComponent } from './common/components/custom-date-selector/dialog-calendar/dialog-calendar.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MomentModule,
    RouterModule.forChild(internalRoutes),
    ReactiveFormsModule,
    TextMaskModule,

    BottomSheetModule,
    PclCommonModule,
    CustomMaterialModule
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
    NoEntriesFallbackComponent,
    GoogleFormComponent,
    CreateScheduleComponent,
    IntroductionComponent,
    ScheduleStep1Component,
    ScheduleStep2Component,
    ScheduleStep3Component,
    ScheduleStep4Component,
    ScheduleStep5Component,
    ScheduleStep6Component,
    ScheduleStep7Component,
    ScheduleStep8Component,
    ScheduleStep9Component,
    ScheduleStep10Component,
    ScheduleStep11Component,
    SelectMonthForSchedulingComponent,
    CustomDateSelectorComponent,
    DialogCalendarComponent
  ],
  entryComponents: [DialogCalendarComponent]
})
export class InternalModule { }
