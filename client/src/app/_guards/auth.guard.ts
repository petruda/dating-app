import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  Swal.fire('it works');
  return true 
};
