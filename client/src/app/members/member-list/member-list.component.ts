import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MemberCardComponent } from "../member-card/member-card.component";
import { Pagination } from '../../_models/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UserParams } from '../../_models/userPrams';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import {MatRadioModule} from '@angular/material/radio';


@Component({
    selector: 'app-member-list',
    standalone: true,
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.scss',
    imports: [CommonModule, HttpClientModule, RouterModule, MemberCardComponent,FormsModule,NgbPaginationModule, MatRadioModule,ReactiveFormsModule,FormsModule]
})
export class MemberListComponent implements OnInit {
    // members$: Observable<Member[]> | undefined;
    members : Member[] = [];
    pagination: Pagination | undefined;
    userParams: UserParams | undefined;
    genderList = [{value: 'male', display: 'Males'}, {value:'female', display: 'Females'}];
    created = 'created';
    lastActive = 'lastActive';

    constructor(private memberService: MembersService){ 
     this.userParams = this.memberService.getUserParams();
    }

    ngOnInit(): void{
      // this.members$ = this.memberService.getMembers();
      this.loadmembers();
    }


    loadmembers(){
      if(this.userParams) {
        this.memberService.setUserParams(this.userParams);
        this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination){
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
      }
      
    }

    resetFilters(){
      
        this.userParams = this.memberService.resetUserParams();
        this.loadmembers();
      
    }

    pageChanged( event: any) {
      if (this.userParams && this.userParams?.pagenumber !== event){
         this.userParams.pagenumber = event;
         this.memberService.setUserParams(this.userParams);
         this.loadmembers();
      }
     
    }

    ordrByChange(value: string){
      if(this.userParams){
      this.userParams.orderBy = value;
      this.loadmembers()
    }
  }

}
