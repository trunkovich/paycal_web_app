import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PclHeaderComponent } from './components/pcl-header/pcl-header.component';
import { PclButtonComponent } from './components/pcl-button/pcl-button.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PhonePipe } from './pipes/phone.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { MultilineErrorMsgComponent } from './components/multiline-error-msg/multiline-error-msg.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { CustomMaterialModule } from '../custom-material.module';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,

      CustomMaterialModule
    ],
    exports: [
      PclButtonComponent,
      PclHeaderComponent,
      NavigationComponent,
      LoaderComponent,
      PhonePipe,
      MultilineErrorMsgComponent,
      SafeUrlPipe
    ],
    declarations: [
      PclButtonComponent,
      PclHeaderComponent,
      NavigationComponent,
      PhonePipe,
      LoaderComponent,
      MultilineErrorMsgComponent,
      SafeUrlPipe
    ],
    providers: [],
})
export class PclCommonModule { }
