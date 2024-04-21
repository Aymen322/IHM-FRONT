import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/ClientService';
import { Client } from '../models/Client';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'admin-client',
  templateUrl: './admin-client.component.html',
  styleUrls: ['./admin-client.component.css']
})
export class AdminClientComponent implements OnInit {
  clients: Client[] = [];
  columns: string[] = ['firstname', 'lastname', 'email', 'phonenumber', '_id'];

  constructor(public clientsService: ClientService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadClients(); // Call loadClients method when the component initializes
  }

  loadClients(): void {
    this.clientsService.getClients().subscribe(
      (data: any) => {
        // Assuming 'data' is the API response containing client data
        this.clients = data as Client[]; // Assigning response to clients array
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  deleteClient(id: number): void {
    // Show confirmation dialog before deleting
    if (confirm('Are you sure you want to delete this client?')) {
      // Call service method to delete client
      this.clientsService.deleteClient(id).subscribe(() => {
        console.log('Client deleted successfully');
        // Refresh client list after deletion
        this.loadClients();
      });
    }
  }
}
