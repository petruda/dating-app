import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
