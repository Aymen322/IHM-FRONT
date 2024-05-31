import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegionService } from '../../services/RegionService';
import { Region } from '../../models/Region';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrl: './region-form.component.css'
})
export class RegionFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RegionFormComponent>, 
    private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: Region,
    private Reg : RegionService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      score: [this.data?.score || '', Validators.required],
      hotels: [this.data?.hotels || '', Validators.required],
      
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const updatedRegionData = this.form.value;
      if (this.data && this.data.id) {
        // Si l'ID du client existe, mettez à jour le client
        updatedRegionData.id = this.data.id;
        this.Reg.updateRegion(updatedRegionData).subscribe(
          response => {
            console.log('Region updated successfully!', response);
            this.dialogRef.close(updatedRegionData); // Fermez la modal avec les nouvelles données du client
          },
          error => {
            console.error('Error updating Region:', error);
            // Gérez l'erreur selon vos besoins (par exemple, affichez un message d'erreur à l'utilisateur)
          }
        );
      } else {
        // Si l'ID du client n'existe pas, créez un nouveau client
        this.Reg.createRegion(updatedRegionData).subscribe(
          response => {
            console.log('Region created successfully!', response);
            this.dialogRef.close(updatedRegionData); // Fermez la modal avec les nouvelles données du client
          },
          error => {
            console.error('Error creating Region:', error);
            // Gérez l'erreur selon vos besoins (par exemple, affichez un message d'erreur à l'utilisateur)
          }
        );
      }
    }
  }
}
