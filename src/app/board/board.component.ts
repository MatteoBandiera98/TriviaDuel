import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Importa il Router
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

  @ViewChild('ohNoAudio') ohNoAudio!: ElementRef<HTMLAudioElement>;
  @ViewChild('applauseAudio') applauseAudio!: ElementRef<HTMLAudioElement>;
  @ViewChild('backgroundAudio') backgroundAudio!: ElementRef<HTMLAudioElement>;

  cells: Cell[] = [];
  player = { name: 'Player 1', position: -1, points: 0 };
  currentQuestion: Question | null = null;
  quizStarted: boolean = false;
  selectedAnswer: string | null = null;
  correctAnswer: string | null = null;
  timerSubscription: Subscription | null = null;
  timerDisplay: string = '';

  volume: number = 50; // Volume iniziale
  selectedPlayer: string = 'Player 1'; // Player iniziale

  // Mappa dei colori per le categorie
  categoryColors: { [key: string]: string } = {
    'Storia': '#ce93d8',
    'Musica': '#ffecb3',
    'Cinema': '#81d4fa',
    'Letteratura': '#ef9a9a',
    'Cultura Generale': '#8BC34A',
    'Geografia': '#ffcc80'
  };

  // Variabili per tracciare le risposte giuste e sbagliate per categoria
  categoryStats: { [key: string]: { correct: number; wrong: number } } = {};

  constructor(
    private gameService: GameService, 
    private questionService: QuestionService, 
    private router: Router // Inietta il Router
  ) { }

  ngOnInit(): void {
    this.playBackgroundMusic();
    this.initializeBoard();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.stopBackgroundMusic();
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
        const randomIndices = this.generateRandomIndices(this.cells.length);
        randomIndices.forEach((randomIndex, index) => {
          this.cells[index].topic = categories[randomIndex % categories.length];
          this.categoryStats[categories[randomIndex % categories.length]] = { correct: 0, wrong: 0 }; // Inizializza le statistiche
        });
      },
      error => {
        console.error('Error retrieving categories:', error);
      }
    );
  }

  generateRandomIndices(length: number): number[] {
    const indices = Array.from({ length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }

  onDiceRolled(result: number) {
    let newPosition = this.player.position + result;
    if (newPosition >= 30) {
      newPosition = 29;
      this.endGame(); // Termina il gioco se il giocatore raggiunge l'ultima casella
    }
    this.player.position = newPosition;

    if (this.cells[newPosition].index === newPosition) {
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
    let countdown = 30;
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      countdown--;
      this.timerDisplay = countdown >= 10 ? `${countdown}` : `0${countdown}`;
      if (countdown === 0) {
        this.onAnswer(null);
      }
    });
  }

  clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
      this.timerDisplay = '';
    }
  }

  onAnswer(selected: string | null) {
    this.clearTimer();
    this.selectedAnswer = selected;
    if (selected !== null) {
      const category = this.currentQuestion!.category;
      if (selected.toUpperCase() === this.correctAnswer) {
        this.player.points += 100;
        this.categoryStats[category].correct += 1;
        this.gameService.updatePlayerScore(1, this.player.points).subscribe(
          response => {
            console.log('Punteggio aggiornato:', response);
          },
          error => {
            console.error('Errore durante l\'aggiornamento del punteggio:', error);
          }
        );
        this.launchConfetti();
        this.playAudio(this.applauseAudio);
      } else {
        this.player.points -= 50;
        this.categoryStats[category].wrong += 1;
        this.gameService.updatePlayerScore(1, this.player.points).subscribe(
          response => {
            console.log('Punteggio aggiornato:', response);
          },
          error => {
            console.error('Errore durante l\'aggiornamento del punteggio:', error);
          }
        );
        this.playAudio(this.ohNoAudio);
      }
    }
    setTimeout(() => {
      this.currentQuestion = null;
      this.quizStarted = false;
    }, 3000);
  }

  playAudio(audioElement: ElementRef<HTMLAudioElement>) {
    audioElement.nativeElement.play().catch(error => {
      console.error('Audio playback failed:', error);
    });
  }

  playBackgroundMusic() {
    const audio = new Audio('../../assets/audio/KAROLG.mp3');
    audio.loop = true;
    audio.play().catch(error => {
      console.error('Playback error:', error);
    });
  }

  stopBackgroundMusic() {
    const audio: HTMLAudioElement = this.backgroundAudio.nativeElement;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
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
    return this.categoryColors[category] || '#ffffff';
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

  onVolumeChange(volume: number): void {
    const audio: HTMLAudioElement = this.backgroundAudio.nativeElement;
    if (audio) {
      audio.volume = volume / 100;
    }
  }

  onPlayerChange(player: string): void {
    console.log('Player cambiato:', player);
  }

  endGame() {
    this.router.navigate(['/results'], { 
      state: { 
        playerPoints: this.player.points, 
        categoryStats: this.categoryStats 
      } 
    });
  }
}
