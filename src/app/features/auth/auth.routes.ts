import { Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ForgotPasswordSuccessComponent} from "./forgot-password-success/forgot-password-success.component";


export const authRoutes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'forgot-password-success', component: ForgotPasswordSuccessComponent}
];
