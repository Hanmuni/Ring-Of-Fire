import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  games$: Observable<any>;
  constructor(private firestore: Firestore) {
    const set = collection(firestore, 'games');
    this.games$ = collectionData(set);

    this.games$.subscribe((newGames) => {
      console.log('New Games: ', newGames);
    });
  }
}
