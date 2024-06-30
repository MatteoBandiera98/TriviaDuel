// quiz.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  @Input() question: any; // Assicurati che 'question' sia correttamente passato dal parent component
  @Output() answer = new EventEmitter<boolean>();

  selectedOption: string = '';

  onSelectOption(option: string) {
    this.selectedOption = option;
  }

  submitAnswer() {
    if (this.selectedOption === this.question.correctOption) {
      this.answer.emit(true); // Invia 'true' se la risposta è corretta
    } else {
      this.answer.emit(false); // Invia 'false' se la risposta è sbagliata
    }
  }
}
