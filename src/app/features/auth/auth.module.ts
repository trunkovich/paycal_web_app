import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { SignInComponent } from './sign-in/sign-in.component';
import { authRoutes } from './auth.routes';
import { PclCommonModule } from '../../common/pcl-common.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordSuccessComponent } from './forgot-password-success/forgot-password-success.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { TwoPasswordsFormComponent } from './two-passwords-form/two-passwords-form.component';
import { PasswordResetSuccessComponent } from './password-reset-success/password-reset-success.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { CompleteRegistrationSuccessComponent } from './complete-registration-success/complete-registration-success.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordSuccessComponent } from './change-password-success/change-password-success.component';
import { TermsComponent } from './terms/terms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageAlertComponent } from './local-storage-alert/local-storage-alert.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    MaterialModule,
    BrowserAnimationsModule,
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
    TwoPasswordsFormComponent,
    PasswordResetSuccessComponent,
    CompleteRegistrationComponent,
    CompleteRegistrationSuccessComponent,
    RegistrationComponent,
    RegistrationSuccessComponent,
    ChangePasswordComponent,
    ChangePasswordSuccessComponent,
    TermsComponent,
    LocalStorageAlertComponent
  ]
})
export class AuthModule { }
