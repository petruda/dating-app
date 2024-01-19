import { Component, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatTab, MatTabChangeEvent, MatTabGroup, MatTabsModule} from '@angular/material/tabs';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
@Component({
    selector: 'app-member-detail',
    standalone: true,
    templateUrl: './member-detail.component.html',
    styleUrl: './member-detail.component.scss',
    imports: [CommonModule, HttpClientModule, RouterModule, MatTabsModule, GalleryModule, TimeagoModule, MemberMessagesComponent]
})
export class MemberDetailComponent {
  @ViewChild('memberTabs') memberTabs?: MatTabGroup;
  member: Member= {} as Member;
  images: GalleryItem[]= [];
  activaTab?: MatTab;
  messages: Message[] = [];
  labelName:string | undefined;
  selectedIndex = 0;

  constructor(private memberService: MembersService, private route: ActivatedRoute, private toastr: ToastrService, private messageService: MessageService){}

  ngOnInit() : void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    });
    this.route.queryParams.subscribe({
      next: params => {
        this.selectedIndex = params['index'];
        this.loadMessages()
      }
    });
    this.getImages();
  }

  getMessagesTab(){
    this.selectedIndex = 3;
  }

  selectedTabValue(event: MatTabChangeEvent){
    this.selectedIndex = event.index;
    this.labelName = event.tab.textLabel;
    if(this.selectedIndex === 3 || this.labelName === 'Messages'){
      this.loadMessages();
    }
  }

  loadMessages() {
    if(this.member){
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      })
    }
  }

  getImages(){
if(!this.member) return;

    for(const photo of this.member?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))

    }
  }
  addLike(member: Member){
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toastr.success('You have liked ' + member.knownAs)
    })
  }

}
