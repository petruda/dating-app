import { Component } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MemberCardComponent } from "../member-card/member-card.component";
import { Observable } from 'rxjs';

@Component({
    selector: 'app-member-list',
    standalone: true,
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.scss',
    imports: [CommonModule, HttpClientModule, RouterModule, MemberCardComponent]
})
export class MemberListComponent {
    members$: Observable<Member[]> | undefined;

    constructor(private memberService: MembersService){ }

    ngOnInit(): void{
      this.members$ = this.memberService.getMembers();
    }


}
