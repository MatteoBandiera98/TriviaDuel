import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.scss']
})
export class ImpostazioniComponent {

  @Output() volumeChange = new EventEmitter<number>();
  @Output() playerChange = new EventEmitter<string>();

  volume: number = 50; // Valore iniziale del volume
  selectedPlayer: string = ''; // Player selezionato
  availablePlayers: { name: string, image: string }[] = [
    { name: 'Pipu', image: '../../assets/images/DinoSprites_vita.gif' },
    { name: 'Tard', image: '../../assets/images/DinoSprites_tard.gif' },
    { name: 'Mort', image: '../../assets/images/DinoSprites_mort.gif' },
    { name: 'Doux', image: '../../assets/images/DinoSprites_doux.gif' }
  ]; // Elenco dei player disponibili con immagini

  constructor(private router: Router) { }

  adjustVolume(): void {
    this.volumeChange.emit(this.volume);
  }

  onPlayerChange(): void {
    const selectedPlayer = this.availablePlayers.find(player => player.name === this.selectedPlayer);
    if (selectedPlayer) {
      this.playerChange.emit(selectedPlayer.image);
    }
  }

  goBack(): void {
   
    this.router.navigateByUrl('/menu');
  }
}
