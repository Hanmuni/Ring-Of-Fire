import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-player',
  templateUrl: './mobile-player.component.html',
  styleUrls: ['./mobile-player.component.scss']
})

export class MobilePlayerComponent implements OnInit {
  @Input() name;
  @Input() image;
  @Input() activePlayer: boolean = false;

  ngOnInit(): void {
  }

}

