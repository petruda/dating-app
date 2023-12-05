import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from "./home/home.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        AccountService
    ],
    imports: [CommonModule, RouterOutlet, HttpClientModule, NavComponent, FormsModule, HomeComponent]
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor( private accountService: AccountService) {}
  ngOnInit(): void {
    this.setCurrentUser();
  }



  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.serCurrentUser(user);
  }

}
