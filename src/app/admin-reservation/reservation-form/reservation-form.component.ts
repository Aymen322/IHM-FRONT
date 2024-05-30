import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reservation } from '../../models/Reservation';
import { ReservationService } from '../../services/ReservationService';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ReservationFormComponent>, 
    private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: Reservation,
    private RC : ReservationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      client_id: [this.data?.client_id || '', Validators.required],
      hotel_id: [this.data?.hotel_id || '', Validators.required],
      status: [this.data?.status || '', [Validators.required]],
      check_in_date: [this.data?.check_in_date || '', [Validators.required]],
      check_out_date: [this.data?.check_out_date || '', [Validators.required]],
      
    });
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  close(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (this.form.valid) {
      const updatedReservationData = this.form.value;
      if (this.data && this.data.id) {
        updatedReservationData.id = this.data.id; // Assurez-vous que l'ID du client est inclus dans les données à mettre à jour
      }
      this.RC.updateReservation(updatedReservationData).subscribe(
        response => {
          console.log('Reservation updated successfully!', response);
          this.dialogRef.close(updatedReservationData); // Fermez la modal avec les nouvelles données du client
        },
        error => {
          console.error('Error updating Reservation:', error);
          // Gérez l'erreur selon vos besoins (par exemple, affichez un message d'erreur à l'utilisateur)
        }
      );
    }
  }

}
