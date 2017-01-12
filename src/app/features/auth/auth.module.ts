import { NgModule } from '@angular/core';
import {SignInComponent} from "./sign-in/sign-in.component";
import {RouterModule} from "@angular/router";
import {authRoutes} from "./auth.routes";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";
import {MaterialModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {PclCommonModule} from "../../common/pcl-common.module";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    MaterialModule,
    PclCommonModule,
    RouterModule.forChild(authRoutes),

    //temp
    FormsModule
  ],
  exports: [SignInComponent],
  declarations: [SignInComponent, ForgotPasswordComponent]
})
export class AuthModule { }
