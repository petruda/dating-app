import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HttpClientModule } from '@angular/common/http';
import { errhandlInterceptor } from './_interceptors/errhandl.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { MembersService } from './_services/members.service';
import { AccountService } from './_services/account.service';
import { jwtImplInterceptor } from './_interceptors/jwt-impl.interceptor';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    MembersService,
    AccountService,
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(HttpClientModule),
    jwtImplInterceptor,
    errhandlInterceptor, 
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    }
  ]
};
