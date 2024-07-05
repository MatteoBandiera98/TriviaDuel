import { Component, Output, EventEmitter } from '@angular/core';

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
  availablePlayers: string[] = ['Player 1', 'Player 2', 'Player 3', 'Player 4']; // Elenco dei player disponibili

  constructor() { }

  adjustVolume(): void {
    this.volumeChange.emit(this.volume);
  }

  onPlayerChange(): void {
    this.playerChange.emit(this.selectedPlayer);
  }

}
