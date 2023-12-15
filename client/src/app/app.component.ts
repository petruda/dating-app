import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from "./home/home.component";
import { MembersService } from './_services/members.service';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';





@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [AccountService, MembersService, JwtInterceptor],
    imports: [CommonModule, RouterOutlet, HttpClientModule, NavComponent, FormsModule, HomeComponent]
})
export class AppComponent implements OnInit {
  title = 'THIRSTY';
  constructor( private accountService: AccountService, private http: HttpClientModule) {}
  
  
  ngOnInit(): void {
    this.setCurrentUser();
  }



  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

}


