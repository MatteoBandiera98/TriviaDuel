// player.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() playerName: string = '';
  @Input() position: number = 0;
  @Input() points: number = 0;
}

