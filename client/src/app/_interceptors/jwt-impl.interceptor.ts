
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { Provider } from '@angular/core';
import { JwtInterceptor } from './jwt.interceptor';

export const jwtImplInterceptor:  Provider =
{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true };


