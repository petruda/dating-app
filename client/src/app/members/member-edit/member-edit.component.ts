import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener, NgModule, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { GalleryModule } from 'ng-gallery';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule,MatTabsModule,GalleryModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent {
 @ViewChild('editForm') editForm: NgForm | undefined;
 @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
  if(this.editForm?.dirty){
    $event.returnValue = true;
  }
 }
  member: Member | undefined;
  user: User | null = null;



  constructor(private accountService: AccountService, private membersService: MembersService, private tostr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }

  ngOnInit() : void {
    this.loadMember()
  }

  loadMember(){
    if(!this.user) return;
    this.membersService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }
  updateMember(){
    this.membersService.updateMember(this.editForm?.value).subscribe({
      next: _ => {

           Swal.fire({
          title: "Changes saved",
          text: "Your changes have been saved",
          icon: "success"
         });
          this.editForm?.reset(this.member);
      }
    });
  }
}
