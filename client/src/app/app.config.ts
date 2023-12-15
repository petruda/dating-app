import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS} from '@angular/common/http';

import { routes } from './app.routes';

import {HttpClientModule } from '@angular/common/http';
import { errhandlInterceptor } from './_interceptors/errhandl.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { MembersService } from './_services/members.service';
import { AccountService } from './_services/account.service';
import { jwtImplInterceptor } from './_interceptors/jwt-impl.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    importProvidersFrom(HttpClientModule),
    // jwtImplInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    errhandlInterceptor,
    MembersService,
    AccountService
  ]
};
