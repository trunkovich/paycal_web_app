import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';

import {SignInComponent} from './sign-in/sign-in.component';
import {authRoutes} from './auth.routes';
import {PclCommonModule} from '../../common/pcl-common.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordSuccessComponent } from './forgot-password-success/forgot-password-success.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegistrationStep2Component } from './registration-step2/registration-step2.component';
import { TwoPasswordsFormComponent } from './two-passwords-form/two-passwords-form.component';
import { PasswordResetSuccessComponent } from './password-reset-success/password-reset-success.component';
import {RegistrationStep2SuccessComponent} from './registration-step2-success/registration-step2-success.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    MaterialModule,
    PclCommonModule,
    RouterModule.forChild(authRoutes),

    // temp
    FormsModule
  ],
  exports: [SignInComponent],
  declarations: [
    SignInComponent,
    ForgotPasswordComponent,
    ForgotPasswordSuccessComponent,
    PasswordResetComponent,
    RegistrationStep2Component,
    TwoPasswordsFormComponent,
    PasswordResetSuccessComponent,
    RegistrationStep2SuccessComponent
  ]
})
export class AuthModule { }
