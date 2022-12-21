import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-game-section',
  templateUrl: './game-section.component.html',
  styleUrls: ['./game-section.component.scss']
})
export class GameSectionComponent implements OnInit {
  drawCardAnimation = false;
  currentCard: string = '';
  game: Game;


  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.newGame();
    this
      .firestore
      .collection('games')
      .valueChanges()
      .subscribe((game) => {
        console.log(this.game);
      })
  }
  newGame() {
    this.game = new Game();
    this.firestore
      .collection('games')
      .add(this.game.toJSON());
  }
  drawCard() {
    if (this.game.players.length < 2) {
      this.openDialog();
    }
    else {
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



