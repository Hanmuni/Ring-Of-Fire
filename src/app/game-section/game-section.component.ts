import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game-section',
  templateUrl: './game-section.component.html',
  styleUrls: ['./game-section.component.scss']
})
export class GameSectionComponent implements OnInit {
  drawCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }
  newGame() {
    this.game = new Game();
    console.log(this.game);
  }
  drawCard() {
    if (!this.drawCardAnimation) {
      this.drawCardAnimation = true;
      this.currentCard = this.game.stack.pop();
      
      setTimeout(() => {
        this.drawCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }

}
