import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MemberCardComponent } from "../member-card/member-card.component";
import { Pagination } from '../../_models/pagination';
import { FormsModule } from '@angular/forms';
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
    imports: [CommonModule, HttpClientModule, RouterModule, MemberCardComponent,FormsModule,NgbPaginationModule, MatRadioModule]
})
export class MemberListComponent implements OnInit {
    // members$: Observable<Member[]> | undefined;
    members : Member[] = [];
    pagination: Pagination | undefined;
    userParams: UserParams | undefined;
    user: User | undefined;
    genderList = [{value: 'male', display: 'Males'}, {value:'female', display: 'Females'}]
    orderList = [
      {
        value : 'lastActive',
        display: 'Last Active'
      },
      {
        value : 'created',
        display: 'Newest'
      },

    ]

    constructor(private memberService: MembersService, private accountService: AccountService){ 
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => {
          if(user){
          this.userParams = new UserParams(user);
          this.user = user;
        }
        }
      })
    }

    ngOnInit(): void{
      // this.members$ = this.memberService.getMembers();
      this.loadmembers();
    }


    loadmembers(){
      if( !this.userParams) return;
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination){
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }

    resetFilters(){
      if(this.user){
        this.userParams = new UserParams(this.user);
        this.loadmembers();
      }
    }

    pageChanged( event: any) {
      if (this.userParams && this.userParams?.pagenumber !== event){
         this.userParams.pagenumber = event;
         this.loadmembers();
      }
     
    }

}
