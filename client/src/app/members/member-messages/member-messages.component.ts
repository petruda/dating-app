import { Component, Input, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, MemberCardComponent,FormsModule,NgbPaginationModule, MatRadioModule,ReactiveFormsModule,FormsModule, MatTabsModule, TimeagoModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss'
})
export class MemberMessagesComponent {
  @Input() username?: string;
  @ViewChild('messageForm') messageForm?: NgForm;
  @Input() messages: Message[] = [];
  messageContent = '';
  /**
   *
   */
  constructor(private messageService:MessageService) {  }

  ngOnInit(): void{
  }
  sendMessage(){
    if(!this.username) return
    this.messageService.sendMessage(this.username,this.messageContent).subscribe({
      next: message => {
        this.messages.push(message);
        if(this.messageForm) this.messageForm.reset;
      }
    })
  }

}
