import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {internalRoutes} from './internal.routes';
import {InternalComponent} from './internal.component';
import {PclCommonModule} from '../../common/pcl-common.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MoreComponent } from './more/more.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    PclCommonModule,
    RouterModule.forChild(internalRoutes),
  ],
  declarations: [
    InternalComponent,
    HomeComponent,
    SearchComponent,
    MoreComponent,
    ProfileComponent
  ]
})
export class InternalModule { }
