import { NgModule } from '@angular/core';

import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {PclCommonModule} from '../../../common/pcl-common.module';
import {MaterialModule} from '@angular/material';
import {MomentModule} from 'angular2-moment';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {searchRoutes} from './search.routes';
import {SearchComponent} from './search.component';
import {InternalModule} from '../internal.module';

@NgModule({
    imports: [
      BrowserModule,
      CommonModule,
      PclCommonModule,
      MaterialModule,
      MomentModule,
      RouterModule.forChild(searchRoutes),
      ReactiveFormsModule,
      InternalModule
    ],
    exports: [],
    declarations: [SearchComponent],
    providers: [],
})
export class SearchModule { }
