import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  totalPoints: number = 1350; 

  categories = [
    { title: 'Storia', correct: 10, wrong: 5 },
    { title: 'Geografia', correct: 8, wrong: 2 },
    { title: 'Cinema', correct: 15, wrong: 3 },
    { title: 'Letteratura', correct: 12, wrong: 4 },
    { title: 'Musica', correct: 7, wrong: 1 },
    { title: 'Cultura generale', correct: 20, wrong: 6 }
  ];

  constructor(private router: Router) {}

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
