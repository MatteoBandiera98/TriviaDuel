// app.component.ts
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] ,

  animations: [
    trigger('pageFlip', [
      transition(':enter', [
        style({ transform: 'rotateY(-160deg)', opacity: 0 }),
        animate('1s cubic-bezier(0.23, 1, 0.32, 1)', style({ transform: 'rotateY(0deg)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'rotateY(0deg)', opacity: 1 }),
        animate('1s cubic-bezier(0.23, 1, 0.32, 1)', style({ transform: 'rotateY(160deg)', opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent { }
