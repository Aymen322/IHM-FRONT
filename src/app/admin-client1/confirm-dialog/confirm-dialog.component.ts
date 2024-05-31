import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
isModalOpen: any;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  public title="Are you Sure"
  Content="Are you sure you want to delete this item ?"
  Cancel ='Cancel'
  Delete =" Confirm"

}
