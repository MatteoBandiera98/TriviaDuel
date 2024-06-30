// question.component.ts
import { Component, Input } from '@angular/core';

interface Question {
  text: string;
  options: string[];
  correct: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question: Question | null = null;

  checkAnswer(option: string) {
    if (this.question && option === this.question.correct) {
      alert('Corretto!');
    } else {
      alert('Sbagliato!');
    }
  }
}
