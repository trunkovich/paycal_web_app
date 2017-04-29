import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { MaterialModule } from '@angular/material';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
import { reducer } from './STATE/reducers/index';
import { BottomSheetContainerComponent } from './bottom-sheet/bottom-sheet-container/bottom-sheet-container.component';
import { ViewTypeBottomSheetComponent } from './features/internal/common/components/view-type-bottom-sheet/view-type-bottom-sheet.component';
import { StartupEffects } from './STATE/effects/startup.effects';
import { OnlyScheduledPersons } from './core/guards/only-scheduled-persons.guard';
import { AvatarService } from './core/services/avatar.service';
import { SearchModule } from './features/internal/search-module/search.module';
import { HomeEffects } from './STATE/effects/home.effects';
import { SearchEffects } from './STATE/effects/search.effects';
import { ContactUsBottomSheetComponent } from './features/internal/contact-us-bottom-sheet/contact-us-bottom-sheet.component';
import { Angulartics2Mixpanel, Angulartics2Module } from 'angulartics2';
import { MixpanelEffects } from './STATE/effects/mixpanel.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    OnlyMobileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpInterceptorModule,
    PclCommonModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    StoreModule.provideStore(reducer),
    EffectsModule.runAfterBootstrap(StartupEffects),
    EffectsModule.runAfterBootstrap(AuthEffects),
    EffectsModule.runAfterBootstrap(ErrorHandlingEffects),
    EffectsModule.runAfterBootstrap(ProfileEffects),
    EffectsModule.runAfterBootstrap(ReferencesEffects),
    EffectsModule.runAfterBootstrap(ScheduleEffects),
    EffectsModule.runAfterBootstrap(HomeEffects),
    EffectsModule.runAfterBootstrap(SearchEffects),
    EffectsModule.runAfterBootstrap(MixpanelEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    Angulartics2Module.forRoot([ Angulartics2Mixpanel ]),
    BrowserAnimationsModule,

    InternalModule,
    AuthModule,
    SearchModule
  ],
  providers: [
    Api,
    AuthService,
    ReferencesService,
    ScheduleService,
    PaycalHttpInterceptor,
    AvatarService,

    // GUARDS
    OnlySignedInUsers,
    OnlyMobileDevices,
    OnlyDesktopDevices,
    OnlyScheduledPersons
  ],
  bootstrap: [AppComponent],
  entryComponents: [ViewTypeBottomSheetComponent, BottomSheetContainerComponent, ContactUsBottomSheetComponent]
})
export class AppModule { }
