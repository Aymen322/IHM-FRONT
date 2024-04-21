import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from '../../services/ClientService';
import { Client } from '../../models/Client';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  clientForm: FormGroup;
  clients: Client = {
    id: undefined, // Initialize id as undefined or a number if it's available
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: ''
  };
  display = "none";

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private clientsService: ClientService
  ) {
    this.clientForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phonenumber: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.clientsService.createClient(this.clientForm.value).subscribe(
        () => {
          console.log("Client created successfully!");
          window.location.reload();
        },
        (error) => {
          console.error("Error creating client:", error);
        }
      );
    } else {
      console.error("Form is invalid. Cannot submit.");
    }
  }

  addClient = (): void => {
    this.clientsService.createClient(this.clients).subscribe((data) => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
  };

  openModal(): void {
    this.display = "block";
  }

  closeModal(): void {
    this.display = "none";
  }
}
