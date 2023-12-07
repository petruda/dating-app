import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @Output() cancelRegister = new EventEmitter();
    model: any = {};

  constructor(private accountService: AccountService){}

  ngOnInit(): void{
  }

    register(){
      this.accountService.register(this.model).subscribe({
        next: () => {
          this.cancel();
        },
        error: error => {
          Swal.fire({
            title: 'Error!',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'Close'
          })
          
        }
      })
    }

    cancel(){
      this.cancelRegister.emit(false);
    }
}
