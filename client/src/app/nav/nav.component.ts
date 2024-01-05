import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { User } from '../_models/user';




@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  model: any = {};
  

  constructor(public accountService: AccountService, private router: Router){ }

 

  ngOnInit(): void{
   
  }


  login(){
    this.accountService.login(this.model).subscribe({
      next: () =>  this.router.navigateByUrl('/members')
    })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}


