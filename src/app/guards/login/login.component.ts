import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login success:', response);
        this.router.navigate(['/menu']); // Reindirizza dopo il login
      },
      error => {
        console.error('Login error:', error);
        if (error instanceof HttpErrorResponse) {
          this.error = error.error || 'Errore durante il login. Riprova più tardi.';
        } else {
          this.error = 'Errore imprevisto durante il login. Riprova più tardi.';
        }
      }
    );
  }
}
