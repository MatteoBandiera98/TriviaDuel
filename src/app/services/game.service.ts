import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private players = [
    { position: 0, points: 0 },
    { position: 0, points: 0 }
  ];

  movePlayer(playerIndex: number, steps: number) {
    this.players[playerIndex].position += steps;
  }

  updatePoints(playerIndex: number, points: number) {
    this.players[playerIndex].points += points;
  }

  getPlayerPosition(playerIndex: number): number {
    return this.players[playerIndex].position;
  }

  getPlayerPoints(playerIndex: number): number {
    return this.players[playerIndex].points;
  }

  checkWinner(): number | null {
    const winner = this.players.findIndex(player => player.points >= 1000);
    return winner !== -1 ? winner : null;
  }
}
