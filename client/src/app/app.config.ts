import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { errhandlInterceptor } from './_interceptors/errhandl.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    importProvidersFrom(HttpClientModule),
    errhandlInterceptor,
  ]
};
