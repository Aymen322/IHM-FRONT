import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hotel } from '../../models/Hotel';
import { HotelService } from '../../services/HotelService';

@Component({
  selector: 'app-hotelform',
  templateUrl: './hotelform.component.html',
  styleUrls: ['./hotelform.component.css']
})
export class HotelformComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<HotelformComponent>, 
    private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: Hotel,
    private HS : HotelService
  ) {}

  ngOnInit(): void {
  this.initForm()
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const updatedHotelData = this.form.value;
      if (this.data && this.data.id) {
        updatedHotelData.id = this.data.id; // Assurez-vous que l'ID du client est inclus dans les données à mettre à jour
      }
      this.HS.updateHotel(updatedHotelData).subscribe(
        response => {
          console.log('Client updated successfully!', response);
          this.dialogRef.close(updatedHotelData); // Fermez la modal avec les nouvelles données du client
        },
        error => {
          console.error('Error updating client:', error);
          // Gérez l'erreur selon vos besoins (par exemple, affichez un message d'erreur à l'utilisateur)
        }
      );
    }
  }


  private initForm():void {
    this.form = this.formBuilder.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      contact_email: [this.data?.contact_email || '', Validators.required],
      contact_phone: [this.data?.contact_phone || '', Validators.required],
      price: [this.data?.price || '', Validators.required],
      starnumber: [this.data?.starnumber || '', Validators.required],
      city: [this.data?.city || '', Validators.required]
    });
  }
}
