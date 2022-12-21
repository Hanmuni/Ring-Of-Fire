import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'


@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {
  playername: string = '';

  ngOnInit(): void { }

  constructor(public dialogRef: MatDialogRef<AddPlayerDialogComponent>) {
    
   }

  onNoClick() {
    this.dialogRef.close();
  }
}
