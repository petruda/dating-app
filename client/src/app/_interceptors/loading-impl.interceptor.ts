
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { Provider } from '@angular/core';
import { JwtInterceptor } from './jwt.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

export const loadingImplInterceptor:  Provider =
{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true };