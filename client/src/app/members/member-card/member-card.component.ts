import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
@Input () member: Member | undefined;

  constructor(private memberService: MembersService, private toastr: ToastrService){ }

  ngOnInit(): void {
  }

  addLike(member: Member){
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toastr.success('You have liked ' + member.knownAs)
    })
  }
}
