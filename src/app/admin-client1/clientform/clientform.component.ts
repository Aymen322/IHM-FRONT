import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/ClientService';
 // Importez le service ClientService

@Component({
  selector: 'app-clientform',
  templateUrl: './clientform.component.html',
  styleUrls: ['./clientform.component.css'] // Utilisez `styleUrls` au lieu de `styleUrl`
})
export class ClientformComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ClientformComponent>, 
              private formBuilder: FormBuilder, 
              @Inject(MAT_DIALOG_DATA) public data: Client,
              private clientService: ClientService) {} // Injectez le service ClientService

  ngOnInit(): void {
    this.initForm();
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const updatedClientData = this.form.value;
      if (this.data && this.data.id) {
        updatedClientData.id = this.data.id; // Assurez-vous que l'ID du client est inclus dans les données à mettre à jour
      }
      this.clientService.updateClient(updatedClientData).subscribe(
        response => {
          console.log('Client updated successfully!', response);
          this.dialogRef.close(updatedClientData); // Fermez la modal avec les nouvelles données du client
        },
        error => {
          console.error('Error updating client:', error);
          // Gérez l'erreur selon vos besoins (par exemple, affichez un message d'erreur à l'utilisateur)
        }
      );
    }
  }

  form!: FormGroup; 

  private initForm(): void {
      this.form = this.formBuilder.group({
        lastname: [this.data?.lastname || '', Validators.required],
        firstname: [this.data?.firstname || '', Validators.required],
        email: [this.data?.email || '', Validators.required],
        phonenumber: [this.data?.phonenumber || '', Validators.required],
      });
  }

}
