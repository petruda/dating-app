import { Component } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, MemberCardComponent,FormsModule,NgbPaginationModule, MatRadioModule,ReactiveFormsModule,FormsModule, MatTabsModule, TimeagoModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  messages?: Message[];
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;

  constructor (private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages(){
  this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
    next: response => {
      this.messages = response.result;
      this.pagination = response.pagination;
    }
  })
  }

  pageChanged( event: any) {
    if (this.pageNumber !== event){
       this.pageNumber = event;
       this.loadMessages();
    }
  }

  containerChange(value: string){
    this.container = value;
    this.loadMessages();
  }

}
