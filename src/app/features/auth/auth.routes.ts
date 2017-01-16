import { Routes } from '@angular/router';

import {SignInComponent} from './sign-in/sign-in.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ForgotPasswordSuccessComponent} from './forgot-password-success/forgot-password-success.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {PasswordResetSuccessComponent} from './password-reset-success/password-reset-success.component';
import {CompleteRegistrationSuccessComponent} from './complete-registration-success/complete-registration-success.component';
import {CompleteRegistrationComponent} from './complete-registration/complete-registration.component';
import {OnlyMobileDevices} from '../../core/guards/only-mobile-devices.guard';
import {RegistrationComponent} from './registration/registration.component';

export const AUTH_ROUTES = Object.freeze({
  LOGIN: 'login',
  FORGOT_PASSWORD: 'forgot-password',
  FORGOT_PASSWORD_SUCCESS: 'forgot-password-success',
  PASSWORD_RESET: 'password-reset',
  PASSWORD_RESET_SUCCESS: 'password-reset-success',
  REGISTRATION: 'registration',
  COMPLETE_REGISTRATION: 'complete-registration',
  COMPLETE_REGISTRATION_SUCCESS: 'complete-registration-success'
});

// Can't use AUTH_ROUTES here, because of error:
// `Error encountered resolving symbol values statically`
// Please keep it in sync by hands.
export const authRoutes: Routes = [
  { path: 'login', component: SignInComponent, canActivate: [OnlyMobileDevices] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [OnlyMobileDevices] },
  { path: 'forgot-password-success', component: ForgotPasswordSuccessComponent, canActivate: [OnlyMobileDevices] },
  { path: 'password-reset/:ResetPasswordCode', component: PasswordResetComponent, canActivate: [OnlyMobileDevices] },
  { path: 'password-reset-success', component: PasswordResetSuccessComponent, canActivate: [OnlyMobileDevices] },
  { path: 'registration', component: RegistrationComponent },
  { path: 'complete-registration/:InvitationCode', component: CompleteRegistrationComponent, canActivate: [OnlyMobileDevices] },
  { path: 'complete-registration-success', component: CompleteRegistrationSuccessComponent, canActivate: [OnlyMobileDevices] }
];
