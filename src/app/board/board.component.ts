import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../services/game.service';
import { QuestionService } from '../services/question.service';
import { Subscription, timer } from 'rxjs';
import confetti from 'canvas-confetti';

interface Cell {
  topic: string;
  index: number;
}

interface Question {
  category: string;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  cells: Cell[] = [];
  player = { name: 'Player 1', position: -1, points: 0 };
  currentQuestion: Question | null = null;
  quizStarted: boolean = false;
  selectedAnswer: string | null = null;
  correctAnswer: string | null = null;
  timerSubscription: Subscription | null = null;
  timerDisplay: string = '';

  // Mappa dei colori per le categorie
  categoryColors: { [key: string]: string } = {
    'Storia': '#ce93d8',
    'Musica': '#ffecb3',
    'Cinema': '#81d4fa',
    'Letteratura': '#ef9a9a',
    'Cultura Generale': '#8BC34A',
    'Geografia': '#ffcc80'
  };

  constructor(private gameService: GameService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.initializeBoard();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  initializeBoard() {
    this.cells = Array(30).fill(0).map((_, index) => ({
      topic: '',
      index: index
    }));
  }

  loadCategories() {
    this.questionService.getAllCategories().subscribe(
      categories => {
        for (let i = 0; i < this.cells.length; i++) {
          this.cells[i].topic = categories[i % categories.length];
        }
      },
      error => {
        console.error('Error retrieving categories:', error);
      }
    );
  }

  onDiceRolled(result: number) {
    let newPosition = this.player.position + result;
    if (newPosition >= 30) newPosition = 29;
    this.player.position = newPosition;

    // Controllo se il giocatore è arrivato sulla casella giusta per avviare il quiz
    if (this.cells[newPosition].index === newPosition) {
      // Aggiungi un ritardo di un secondo prima di caricare la domanda
      setTimeout(() => {
        this.loadQuestion(newPosition);
      }, 1000);
    }
  }

  loadQuestion(position: number) {
    const category = this.cells[position].topic;
    this.questionService.getQuestionByCategory(category).subscribe(
      question => {
        this.currentQuestion = question;
        this.quizStarted = true;
        this.selectedAnswer = null;
        this.correctAnswer = question.correctOption.toUpperCase();
        this.startTimer();
      },
      error => {
        console.error('Error retrieving question:', error);
      }
    );
  }

  startTimer() {
    let countdown = 10; // Timer in secondi
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      countdown--;
      this.timerDisplay = countdown >= 10 ? `${countdown}` : `${countdown}`;
      if (countdown === 0) {
        this.onAnswer(null); // Chiamata quando scade il tempo
      }
    });
  }

  clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
      this.timerDisplay = ''; // Pulizia del timerDisplay
    }
  }

  onAnswer(selected: string | null) {
    this.clearTimer();
    this.selectedAnswer = selected;
    if (selected !== null) {
      if (selected.toUpperCase() === this.correctAnswer) {
        this.player.points += 100;
        this.gameService.updatePoints(0, 100);
        this.launchConfetti();
      } else {
        this.player.points -= 50;
        this.gameService.updatePoints(0, -50);
      }
    }
    setTimeout(() => {
      this.currentQuestion = null;
      this.quizStarted = false;
    }, 3000);
  }

  getPlayerImage(): string {
    return '../../assets/images/DinoSprites_mort.gif';
  }

  getPlayerTop(): string {
    const row = Math.floor(this.player.position / 6);
    return `calc(${row * (100 / 5)}vh)`;
  }

  getPlayerLeft(): string {
    const column = this.player.position % 6;
    return `calc(${column * (100 / 6)}%)`;
  }

  getCategoryColor(category: string): string {
    return this.categoryColors[category] || '#ffffff'; // Ritorna il colore associato alla categoria, se non trovato ritorna bianco
  }

  isCorrectAnswer(option: string): boolean {
    return this.selectedAnswer !== null && option.toUpperCase() === this.correctAnswer;
  }

  isWrongAnswer(option: string): boolean {
    return this.selectedAnswer !== null && option !== this.correctAnswer && option === this.selectedAnswer;
  }

  launchConfetti() {
    confetti({
      particleCount: 500,
      spread: 200,
      origin: { y: 0.6 }
    });
  }
}
