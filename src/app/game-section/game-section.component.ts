import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-section',
  templateUrl: './game-section.component.html',
  styleUrls: ['./game-section.component.scss']
})
export class GameSectionComponent implements OnInit {
  drawCardAnimation = false;
  currentCard: string = '';
  game: Game;
  games$: Observable<any>;

  constructor(private firestore: Firestore, public dialog: MatDialog) {
    const set = collection(firestore, 'games');
    this.games$ = collectionData(set);

    this.games$.subscribe((newGames) => {
      console.log('New Games: ', newGames);
    });
   }

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
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.drawCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}



