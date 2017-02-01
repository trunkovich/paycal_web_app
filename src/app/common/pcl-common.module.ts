import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';

import { PclHeaderComponent } from './components/pcl-header/pcl-header.component';
import {PclButtonComponent} from './components/pcl-button/pcl-button.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {RouterModule} from '@angular/router';
import { PhonePipe } from './pipes/phone.pipe';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    imports: [
      CommonModule,
      MaterialModule,
      RouterModule
    ],
    exports: [PclButtonComponent, PclHeaderComponent, NavigationComponent, LoaderComponent],
    declarations: [PclButtonComponent, PclHeaderComponent, NavigationComponent, PhonePipe, LoaderComponent],
    providers: [],
})
export class PclCommonModule { }
