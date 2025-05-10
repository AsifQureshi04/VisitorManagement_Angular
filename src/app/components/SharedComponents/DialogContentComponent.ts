import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  template: `<h2 mat-dialog-title>Notification</h2>
             <mat-dialog-content>{{ data.message }}</mat-dialog-content>`,
})
export class DialogContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
