import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authSrv: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.authSrv.signUp(form.value).subscribe(
      () => {
        console.log('Registration successful');
        this.router.navigate(['/login']); // Redirect after successful registration
      },
      error => {
        console.error('Error during registration:', error);
        // Handle error here, e.g., show a message to the user
      }
    );
  }
}
