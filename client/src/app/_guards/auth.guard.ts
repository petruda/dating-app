import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

 if (!localStorage['user']){
  Swal.fire('you shall not pass');
  return false;
 }else return true;
};
