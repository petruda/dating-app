import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, MemberCardComponent,FormsModule,NgbPaginationModule, MatRadioModule,ReactiveFormsModule,FormsModule, MatTabsModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent {
  members: Member[] | undefined;
  predicate = 'liked';
  title = 'Likes'
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination | undefined;
  constructor(private memberService: MembersService){ }

  ngOnInit(): void {

  }
  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: response => {
        this.members = response.result;
        this.pagination = response.pagination;
      }
    })
  }
  forTitle(title: string, value: string) {
    this.predicate = value;
    this.title = title;
    this.loadLikes();
  }

  pageChanged( event: any) {
    if (this.pageNumber !== event){
       this.pageNumber = event;
       this.loadLikes();
    }
   
  }
}
