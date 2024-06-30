import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent {
  @Output() diceRolled = new EventEmitter<number>();
  diceValue: number = 1; // Valore iniziale del dado

  rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    /*this.diceValue = 0; // Visualizzare un'animazione di rotazione, se desiderato */
    setTimeout(() => {
      this.diceValue = result;
      this.diceRolled.emit(result);
    }, 1000); // Tempo di attesa per l'animazione del dado (1 secondo)
  }

  getDiceImage(): string {
    return `../../assets/dice/dice${this.diceValue}.jpg`;
  }
}
