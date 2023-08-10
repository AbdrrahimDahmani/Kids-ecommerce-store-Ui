import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.css'],
})
export class OverlayMenuComponent {
  constructor(public dialogRef: MatDialogRef<OverlayMenuComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
