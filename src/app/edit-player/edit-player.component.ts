import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})

export class EditPlayerComponent implements OnInit {

  images = ['man.png', 'woman.png'];
  constructor(private dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {

  }

  onNoClick() {
    this.dialogRef.close();
  }
}
