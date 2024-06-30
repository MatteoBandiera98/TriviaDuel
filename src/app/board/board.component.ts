import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../services/game.service';
import { QuestionService } from '../services/question.service';
import { Subscription, timer } from 'rxjs';

interface Cell {
  topic: string;
  index: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  cells: Cell[] = [];
  player = { name: 'Player 1', position: 0 }; // Inizia dalla posizione 0
  currentQuestion: any = null;
  quizStarted: boolean = false;
  selectedAnswer: string | null = null;
  correctAnswer: string | null = null;
  timerSubscription: Subscription | null = null;

  constructor(private gameService: GameService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.initializeBoard();
    this.loadCategories(); // Carica le categorie all'inizio
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  initializeBoard() {
    this.cells = Array(30).fill(0).map((_, index) => ({
      topic: '', // Inizialmente vuoto, le categorie verranno popolate successivamente
      index: index
    }));
  }

  loadCategories() {
    this.questionService.getAllCategories().subscribe(
      categories => {
        // Popola le categorie nei cells
        for (let i = 0; i < this.cells.length; i++) {
          this.cells[i].topic = categories[i % categories.length];
        }
      },
      error => {
        console.error('Errore durante il recupero delle categorie:', error);
        // Gestisci l'errore in base alle esigenze dell'applicazione
      }
    );
  }

  onDiceRolled(result: number) {
    let newPosition = this.player.position + result;
    if (newPosition >= 30) newPosition = 29; // Manteniamo il giocatore entro i limiti del tabellone
    this.player.position = newPosition;
    this.loadQuestion(newPosition);
  }

  loadQuestion(position: number) {
    const category = this.cells[position].topic;
    this.questionService.getQuestionByCategory(category).subscribe(
      question => {
        this.currentQuestion = question;
        this.quizStarted = true; // Avvia il quiz quando la domanda è stata caricata
        this.selectedAnswer = null; // Resetta la risposta selezionata
        this.correctAnswer = question.correctOption; // Imposta la risposta corretta
        this.startTimer(); // Avvia il timer
      },
      error => {
        console.error('Errore durante il recupero della domanda:', error);
        // Gestisci l'errore in base alle esigenze dell'applicazione
      }
    );
  }

  startTimer() {
    this.clearTimer();
    this.timerSubscription = timer(30000).subscribe(() => this.onAnswer(null)); // Termina il quiz dopo 30 secondi
  }

  clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  onAnswer(selected: string | null) {
    this.clearTimer();
    this.selectedAnswer = selected;
    // Imposta il punteggio solo se una risposta è selezionata
    if (selected !== null) {
      if (selected === this.correctAnswer) {
        this.gameService.updatePoints(0, 100); // Aggiorna i punti del giocatore
      } else {
        this.gameService.updatePoints(0, -50); // Detrarrà i punti dal giocatore
      }
    }
    // Non resettiamo currentQuestion e quizStarted qui per mostrare il feedback all'utente
    setTimeout(() => {
      this.currentQuestion = null; // Resetta la domanda corrente
      this.quizStarted = false; // Resetta quizStarted a false dopo che il quiz è completato
    }, 3000); // Mostra il feedback per 3 secondi
  }

  getPlayerImage(): string {
    return '../../assets/images/DinoSprites_mort.gif'; // Percorso alla GIF del player
  }

  getPlayerTop(): string {
    const row = Math.floor(this.player.position / 6);
    return `calc(${row * (100 / 5)}vh)`; // 100vh diviso per il numero di righe
  }

  getPlayerLeft(): string {
    const column = this.player.position % 6;
    return `calc(${column * (100 / 6)}%)`; // 100% diviso per il numero di colonne
  }

  isCorrectAnswer(option: string): boolean {
    return this.selectedAnswer !== null && option === this.correctAnswer;
  }

  isWrongAnswer(option: string): boolean {
    return this.selectedAnswer !== null && option !== this.correctAnswer && option === this.selectedAnswer;
  }
}
