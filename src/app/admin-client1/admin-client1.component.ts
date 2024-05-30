import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../models/Client';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from '../services/ClientService';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClientformComponent } from './clientform/clientform.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Overlay, BlockScrollStrategy } from '@angular/cdk/overlay';


@Component({
  selector: 'app-admin-client1',
  templateUrl: './admin-client1.component.html',
  styleUrls: ['./admin-client1.component.css']
})
export class AdminClient1Component implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phonenumber', 'action'];
  dataSource = new MatTableDataSource<Client>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public CS: ClientService, private dialog: MatDialog , private overlay: Overlay) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getClients(); 
  }

  onEdit(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.CS.getclientById(id).subscribe((client) => {
      dialogConfig.data = client;
      const dialogRef = this.dialog.open(ClientformComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(() => {
        this.getClients();
    })
    });
  }

  getClients(): void {
    this.CS.getClients().subscribe((r) => {
      this.dataSource = new MatTableDataSource<Client>(r);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', // Adjust width as needed
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.CS.deleteClient(id).subscribe(() => {
          this.getClients();
        });
      }
    });
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px'; // Adjust the width as needed
    const dialogRef = this.dialog.open(ClientformComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output:", data);
      this.CS.createClient(data).subscribe(() => {
        this.getClients();
      });
    });
  }
}
