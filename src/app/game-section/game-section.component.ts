import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-section',
  templateUrl: './game-section.component.html',
  styleUrls: ['./game-section.component.scss']
})
export class GameSectionComponent implements OnInit {
  drawCardAnimation = false;
  currentCard: string = '';
  game: Game;
  gamesId: string;


  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.newGame();
    
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gamesId = params['id'];
      
      this
        .firestore
        .collection('games')
        .doc(this.gamesId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log(this.game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
        })
    });
  }
  newGame() {
    this.game = new Game();
    //this.firestore
    // .collection('games')
    //.add(this.game.toJSON());
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



