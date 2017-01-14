import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpInterceptorModule} from 'ng-http-interceptor';
import {MaterialModule} from '@angular/material';

import {HomeModule} from './features/home/home.module';
import {AuthModule} from './features/auth/auth.module';
import {PclCommonModule} from './common/pcl-common.module';
import { AppComponent } from './app.component';
import {AppRoutes} from './app.routes';
import {AuthService} from './core/services/auth.service';
import {OnlySignedInUsers} from './core/guards/only-signed-in-users.guard';
import {PaycalHttpInterceptor} from './core/services/http-interceptor.service';
import {Api} from './core/services/api.service';

import {AuthEffects} from './STATE/effects/auth.effects';
import {authReducer} from './STATE/reducers/auth.reducer';
import {ErrorHandlingEffects} from './STATE/effects/error-handling.effects';
import {ProfileEffects} from './STATE/effects/profile.effects';
import {profileReducer} from './STATE/reducers/profile.reducer';
import {debugReducer} from './STATE/reducers/debug.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpInterceptorModule,
    PclCommonModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    StoreModule.provideStore({ auth: authReducer, profile: profileReducer, debug: debugReducer }),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(ErrorHandlingEffects),
    EffectsModule.runAfterBootstrap(ProfileEffects),

    HomeModule,
    AuthModule
  ],
  providers: [
    Api,
    AuthService,
    PaycalHttpInterceptor,

    // GUARDS
    OnlySignedInUsers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
