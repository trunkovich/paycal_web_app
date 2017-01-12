import { Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";


export const authRoutes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent}
];
