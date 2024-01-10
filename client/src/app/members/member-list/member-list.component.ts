import { Component } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MemberCardComponent } from "../member-card/member-card.component";
import { Observable } from 'rxjs';
import { Pagination } from '../../_models/pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-member-list',
    standalone: true,
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.scss',
    imports: [CommonModule, HttpClientModule, RouterModule, MemberCardComponent, MatPaginatorModule,FormsModule, PaginatorModule,NgbPaginationModule]
})
export class MemberListComponent {
    // members$: Observable<Member[]> | undefined;
    members : Member[] = [];
    pagination: Pagination | undefined;
    pageNumber = 1;
    pageSize = 5;
    first: number = 0;
    rows: number = 5;
    constructor(private memberService: MembersService){ }

    ngOnInit(): void{
      // this.members$ = this.memberService.getMembers();
      this.loadmembers()
    }
    loadmembers(){
      this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
        next: response => {
          if (response.result && response.pagination){
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }

    pageChanged( event: any) {

      if (this.pageNumber !== event.page){
         this.rows = event.rows;
         this.first= event.first;
         this.pageNumber = event.page;
         this.loadmembers();
      }
     
    }

}
