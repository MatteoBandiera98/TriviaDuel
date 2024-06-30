// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']); // Reindirizza dopo il login
      },
      error => {
        this.error = error.error.message; // Gestione degli errori di login
      }
    );
  }
}
