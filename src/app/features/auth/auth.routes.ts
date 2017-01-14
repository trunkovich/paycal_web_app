import { Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ForgotPasswordSuccessComponent} from "./forgot-password-success/forgot-password-success.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {RegistrationStep2Component} from "./registration-step2/registration-step2.component";

export const AUTH_ROUTES = Object.freeze({
  LOGIN: 'login',
  FORGOT_PASSWORD: 'forgot-password',
  FORGOT_PASSWORD_SUCCESS: 'forgot-password-success',
  PASSWORD_RESET: 'password-reset',
  REGISTRATION_STEP_2: 'registration-step-2'
});

// Can't use AUTH_ROUTES here, because of error:
// Error encountered resolving symbol values statically
// Please keep it in sync by hands.
export const authRoutes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-password-success', component: ForgotPasswordSuccessComponent },
  { path: 'password-reset/:ResetPasswordCode', component: PasswordResetComponent },
  { path: 'registration-step-2/:InvitationCode', component: RegistrationStep2Component }
];
