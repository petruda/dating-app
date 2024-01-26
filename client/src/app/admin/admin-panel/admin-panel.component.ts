import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessagesComponent } from '../../members/member-messages/member-messages.component';
import { HasRoleDirective } from '../../_directives/has-role.directive';
import { UserManagementComponent } from "../user-management/user-management.component";
import { PhotoManagementComponent } from "../photo-management/photo-management.component";

@Component({
    selector: 'app-admin-panel',
    standalone: true,
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.scss',
    imports: [CommonModule, HttpClientModule, RouterModule, MatTabsModule, GalleryModule, TimeagoModule, MemberMessagesComponent, HasRoleDirective, UserManagementComponent, PhotoManagementComponent]
})
export class AdminPanelComponent {

}
