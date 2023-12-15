import { Injectable } from '@angular/core';
import{
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';





@Injectable()
export class JwtInterceptor implements HttpInterceptor{

  constructor(private accountService: AccountService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
   
    this.accountService.currentUser$.pipe(take(1)).subscribe({
     
      next: user => {

        if (user) {
          req = req.clone({
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + user.token
            })
          })
        }
      }
    })
    
    
    return next.handle(req);
  }
}