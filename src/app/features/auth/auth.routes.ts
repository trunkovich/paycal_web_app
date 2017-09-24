import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordSuccessComponent } from './forgot-password-success/forgot-password-success.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetSuccessComponent } from './password-reset-success/password-reset-success.component';
import { CompleteRegistrationSuccessComponent } from './complete-registration-success/complete-registration-success.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { OnlyMobileDevices } from '../../core/guards/only-mobile-devices.guard';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordSuccessComponent } from './change-password-success/change-password-success.component';
import { OnlySignedInUsers } from '../../core/guards/only-signed-in-users.guard';
import { TermsComponent } from './terms/terms.component';

export const authRoutes: Routes = [
  { path: 'login', component: SignInComponent, canActivate: [OnlyMobileDevices], data: { animation: { value: 'login' } } },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [OnlyMobileDevices] },
  { path: 'forgot-password-success', component: ForgotPasswordSuccessComponent, canActivate: [OnlyMobileDevices] },
  { path: 'password-reset/:ResetPasswordCode', component: PasswordResetComponent, canActivate: [OnlyMobileDevices] },
  { path: 'password-reset-success', component: PasswordResetSuccessComponent, canActivate: [OnlyMobileDevices] },
  { path: 'registration', component: RegistrationComponent },
  { path: 'registration-success', component: RegistrationSuccessComponent },
  { path: 'complete-registration/:InvitationCode', component: CompleteRegistrationComponent, canActivate: [OnlyMobileDevices] },
  { path: 'complete-registration-success', component: CompleteRegistrationSuccessComponent, canActivate: [OnlyMobileDevices] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [OnlyMobileDevices, OnlySignedInUsers] },
  { path: 'change-password-success', component: ChangePasswordSuccessComponent, canActivate: [OnlyMobileDevices, OnlySignedInUsers] },
  { path: 'terms-and-conditions', component: TermsComponent, data: { animation: { value: 'terms' } } }
];
