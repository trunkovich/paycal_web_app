import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as Raven from 'raven-js';
import { NgxLocalStorageModule } from 'ngx-localstorage';

// Observable imports:
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

import { AuthModule } from './features/auth/auth.module';
import { PclCommonModule } from './common/pcl-common.module';
import { InternalModule } from './features/internal/internal.module';
import { AppComponent } from './app.component';
import { OnlyMobileComponent } from './core/components/only-mobile/only-mobile.component';
import { AppRoutes } from './app.routes';
import { AuthService } from './core/services/auth.service';
import { PaycalHttpInterceptor } from './core/services/http-interceptor.service';
import { Api } from './core/services/api.service';
import { ScheduleService } from './core/services/schedule.service';
import { ReferencesService } from './core/services/references.service';
import { OnlyDesktopDevices } from './core/guards/only-desktop-devices.guard';
import { OnlyMobileDevices } from './core/guards/only-mobile-devices.guard';
import { OnlySignedInUsers } from './core/guards/only-signed-in-users.guard';
import { AuthEffects } from './STATE/effects/auth.effects';
import { ErrorHandlingEffects } from './STATE/effects/error-handling.effects';
import { ProfileEffects } from './STATE/effects/profile.effects';
import { ReferencesEffects } from './STATE/effects/references.effects';
import { ScheduleEffects } from './STATE/effects/schedule.effects';
import { metaReducers, reducers } from './STATE/reducers/index';
import { BottomSheetContainerComponent } from './bottom-sheet/bottom-sheet-container/bottom-sheet-container.component';
import { ViewTypeBottomSheetComponent }
  from './features/internal/common/components/view-type-bottom-sheet/view-type-bottom-sheet.component';
import { StartupEffects } from './STATE/effects/startup.effects';
import { OnlyScheduledPersons } from './core/guards/only-scheduled-persons.guard';
import { AvatarService } from './core/services/avatar.service';
import { SearchModule } from './features/internal/search-module/search.module';
import { HomeEffects } from './STATE/effects/home.effects';
import { SearchEffects } from './STATE/effects/search.effects';
import { ContactUsBottomSheetComponent } from './features/internal/contact-us-bottom-sheet/contact-us-bottom-sheet.component';
import { Angulartics2Module } from 'angulartics2';
import { MixpanelEffects } from './STATE/effects/mixpanel.effects';
import { ContactPersonBottomSheetComponent } from './features/internal/contact-person-bottom-sheet/contact-person-bottom-sheet.component';
import { environment } from '../environments/environment';
import { LocalStorageAlertComponent } from './features/auth/local-storage-alert/local-storage-alert.component';
import { InitEffects } from './STATE/effects/init.effects';
import { CustomMaterialModule } from './custom-material.module';
import { CreateScheduleService } from './core/services/create-schedule.service';
import { CreateScheduleEffects } from './STATE/effects/create-schedule.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError || err);
  }
}

export function provideErrorHandler() {
  if (environment.production) {
    Raven
      .config('https://b37d34c761234570a1a223eacc7c0d88@sentry.io/189282')
      .install();
    return new RavenErrorHandler();
  } else {
    return new ErrorHandler();
  }
}


@NgModule({
  declarations: [
    AppComponent,
    OnlyMobileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      StartupEffects,
      AuthEffects,
      ErrorHandlingEffects,
      ProfileEffects,
      ReferencesEffects,
      ScheduleEffects,
      HomeEffects,
      SearchEffects,
      MixpanelEffects,
      CreateScheduleEffects,
      InitEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    Angulartics2Module.forRoot([ Angulartics2Mixpanel ]),
    BrowserAnimationsModule,
    NgxLocalStorageModule.forRoot(),

    CustomMaterialModule,
    AuthModule,
    PclCommonModule,
    InternalModule,
    SearchModule
  ],
  providers: [
    { provide: ErrorHandler, useFactory: provideErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: PaycalHttpInterceptor, multi: true },
    Api,
    AuthService,
    ReferencesService,
    ScheduleService,
    AvatarService,
    CreateScheduleService,

    // GUARDS
    OnlySignedInUsers,
    OnlyMobileDevices,
    OnlyDesktopDevices,
    OnlyScheduledPersons
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ViewTypeBottomSheetComponent,
    BottomSheetContainerComponent,
    ContactUsBottomSheetComponent,
    ContactPersonBottomSheetComponent,
    LocalStorageAlertComponent
  ]
})
export class AppModule { }
