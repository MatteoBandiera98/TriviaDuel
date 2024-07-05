import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent {
  @Output() diceRolled = new EventEmitter<number>();
  rolling: boolean = false; // Flag per indicare se il dado sta girando
  diceValue: number = 1; // Valore iniziale del dado

  rollDice() {
    this.rolling = true; // Imposta il flag a true per attivare l'animazione

    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      this.diceValue = result;
      this.diceRolled.emit(result);

      setTimeout(() => {
        this.rolling = false; // Ripristina il flag a false dopo l'animazione
      }, 1000); // Tempo di attesa per completare l'animazione (1 secondo)
    }, 1000); // Tempo di attesa per simulare il lancio del dado (1 secondo)
  }

  getDiceImage(): string {
    return `../../assets/dice/dice${this.diceValue}.png`;
  }
}
