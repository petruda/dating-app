import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ComponentRef, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessagesComponent } from '../../members/member-messages/member-messages.component';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';
import { ContentRef } from '@ng-bootstrap/ng-bootstrap/util/popup';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, MatTabsModule, GalleryModule, TimeagoModule, MemberMessagesComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
users: User[] = [];
availabeRoles = [
  'Admin',
  'Moderator',
  'Member'
]
  /**
   *
   */
  constructor(private adminService: AdminService) {  }
  private modalService = inject(NgbModal);

	open(user: User) {
		const modalRef = this.modalService.open(RolesModalComponent);
		modalRef.componentInstance.username = user.username;
    modalRef.componentInstance.availableRoles = this.availabeRoles;
    modalRef.componentInstance.selectedRoles = [...user.roles];
    modalRef.closed.subscribe({
      next: () => {
        const selectedRoles = modalRef.componentInstance.selectedRoles;
        if(!this.arrayEqual(selectedRoles, user.roles)){
          this.adminService.updateUserRoles(user.username, selectedRoles).subscribe({
            next:  roles => user.roles = roles
          })
        }
      }
    })

	}

  private arrayEqual(arr1: any[], arr2: any[]){
      return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }

  ngOnInit(): void{
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users = users
    })
  }

}
