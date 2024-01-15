import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { errhandlInterceptor } from './_interceptors/errhandl.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { MembersService } from './_services/members.service';
import { AccountService } from './_services/account.service';
import { jwtImplInterceptor } from './_interceptors/jwt-impl.interceptor';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BusyService } from './_services/busy.service';
import { loadingImplInterceptor } from './_interceptors/loading-impl.interceptor';
import { TimeagoModule } from 'ngx-timeago';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    MembersService,
    HttpClient,
    AccountService,
    BusyService,
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(HttpClientModule, NgxSpinnerModule.forRoot({ type: 'ball-atom' }), TimeagoModule.forRoot()),
    jwtImplInterceptor,
    errhandlInterceptor, 
    loadingImplInterceptor,
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    }
  ],
};
