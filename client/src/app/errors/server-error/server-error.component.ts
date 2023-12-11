import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
  error: any;
  constructor(private router: Router){ 

    const naviagtion = this.router.getCurrentNavigation();
    this.error = naviagtion?.extras?.state?.['error'];
  }
 
}
