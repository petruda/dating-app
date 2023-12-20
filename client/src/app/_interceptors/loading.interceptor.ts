import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from '../_services/busy.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';



@Injectable()


export class LoadingInterceptor implements HttpInterceptor{

  constructor(private busyService: BusyService, private spinnerService: NgxSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show(undefined, {
      type: 'ball-atom',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    })
    return next.handle(req).pipe(
      delay(1000),
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }




  
};
