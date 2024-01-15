import { Component } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule,MatTabsModule,GalleryModule, TimeagoModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent {
  memeber: Member| undefined;
  images: GalleryItem[]= [];


  constructor(private memberService: MembersService, private route: ActivatedRoute){}

  ngOnInit() : void {
    this.loadMember();
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        
        this.memeber = member,
        this.getImages()
      }
    })
  }

  getImages(){
if(!this.memeber) return;

    for(const photo of this.memeber?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))

    }
  }


}
