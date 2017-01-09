import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from "./sign-in/sign-in.component";
import {RouterModule} from "@angular/router";
import {authRoutes} from "./auth.routes";
import {ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [SignInComponent],
  declarations: [SignInComponent]
})
export class AuthModule { }
