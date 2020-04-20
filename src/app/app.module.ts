import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { EmbedVideo } from 'ngx-embed-video';
import { SafePipeModule } from 'safe-pipe';
import {DatePipe} from '@angular/common';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AppSettings } from './app.settings';

import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';

import { HomeComponent } from './pages/home/home.component';
import { DietComponent } from './pages/diet/diet.component';
import { TrainingComponent } from './pages/training/training.component';
import { RpeComponent } from './pages/rpe/rpe.component';
import { SeeWeightComponent } from './pages/see-weight/see-weight.component';
import { WeightComponent } from './pages/weight/weight.component';
import { AdviceComponent } from './pages/advice/advice.component';
import { WellnessComponent } from './pages/wellness/wellness.component';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { LangService } from './services/lang.service';
import { UserService } from './services/user.service';
import { DietService } from './services/diet.service';
import { TrainingService } from './services/training.service';
import { RpeService } from './services/rpe.service';
import { WeightService } from './services/weight.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TablesService } from './pages/rpe/tables.service';
import { AdviceService } from './services/advive.service';
import { TablesWellnessService } from './pages/wellness/table.wellness.service';
import { WellnessService } from './services/wellness.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    EmbedVideo.forRoot(),
    SafePipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAYi6itRZ0rPgI76O3I83BhhzZHIgMwPg'
    }),
    PerfectScrollbarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    SharedModule,
    PipesModule,
    routing,
    // configure the imports
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    BlankComponent,
    NotFoundComponent,
    ErrorComponent,
    SidenavComponent,
    VerticalMenuComponent,
    FullScreenComponent,
    UserMenuComponent,
    HomeComponent,
    DietComponent,
    TrainingComponent,
    RpeComponent,
    SeeWeightComponent,
    WeightComponent,
    AdviceComponent,
    WellnessComponent
  ],
  entryComponents: [
    VerticalMenuComponent
  ],
  providers: [LangService, UserService, DietService, TrainingService, RpeService, WeightService, TablesService, AdviceService,
    TablesWellnessService, WellnessService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AppSettings, DatePipe,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
