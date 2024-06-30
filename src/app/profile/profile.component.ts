// profile.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any;

  constructor(private authService: AuthService) {
    
  }
}
