import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PclCommonModule } from '../../../common/pcl-common.module';
import { SearchComponent } from './search.component';
import { InternalModule } from '../internal.module';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchResultsListComponent } from './search-list/search-results-list.component';
import { SearchResultsGroupComponent } from './search-list/search-results-group.component';
import { SearchResultsEntryComponent } from './search-list/search-results-entry.component';
import { SearchInputComponent } from './search-list/search-input.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

@NgModule({
    imports: [
      BrowserModule,
      CommonModule,
      PclCommonModule,
      MaterialModule,
      MomentModule,
      RouterModule,
      ReactiveFormsModule,
      InternalModule
    ],
    exports: [],
    declarations: [
      SearchComponent,
      SearchListComponent,
      SearchResultsListComponent,
      SearchResultsGroupComponent,
      SearchResultsEntryComponent,
      SearchInputComponent,
      ScheduleComponent,
      EmployeeProfileComponent
    ],
    providers: [],
})
export class SearchModule { }
