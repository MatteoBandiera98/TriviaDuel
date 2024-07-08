import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  playerPoints: number = 0;
  categoryStats: { [key: string]: { correct: number; wrong: number } } = {};

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.playerPoints = navigation.extras.state['playerPoints'];
      this.categoryStats = navigation.extras.state['categoryStats'];
    }
  }

  ngOnInit(): void { }

  getCategories(): string[] {
    return Object.keys(this.categoryStats);
  }

  startNewGame(): void {
    this.router.navigate(['/game']);
  }
  goToMenu(): void{

    this.router.navigate(['/menu'])
  }
}
