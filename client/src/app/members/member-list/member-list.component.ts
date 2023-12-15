import { Component } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
    selector: 'app-member-list',
    standalone: true,
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.scss',
    imports: [CommonModule, HttpClientModule, RouterModule, MemberCardComponent]
})
export class MemberListComponent {
    members: Member[]= [];

    constructor(private memberService: MembersService){ }

    ngOnInit(): void{
      this.loadMembers();
    }

    loadMembers(){
      this.memberService.getMembers().subscribe({
        next: members => this.members = members
      })
    }
}
