import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { ReservationService } from '../services/ReservationService';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../admin-client1/confirm-dialog/confirm-dialog.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';


@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrl: './admin-reservation.component.css'
})
export class AdminReservationComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['client_id', 'hotel_id', 'status', 'check_in_date', 'check_out_date', 'action'];
  dataSource = new MatTableDataSource<Reservation>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public RS: ReservationService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getReservations(); 
  }

  onEdit(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.RS.getReservationById(id).subscribe((reservation) => {
      dialogConfig.data = reservation;
      const dialogRef =  this.dialog.open(ReservationFormComponent, dialogConfig);
      
  dialogRef.afterClosed().subscribe(() => {
    this.getReservations();
})
    });
  }



  getReservations(): void {
    this.RS.getReservations().subscribe((r) => {
      this.dataSource.data = r;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.RS.deleteReservation(id).subscribe(() => {
          this.getReservations();
        });
      }
    });
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';  // Adjust width as needed
    dialogConfig.panelClass = 'custom-dialog-container';  // Add this line
    const dialogRef = this.dialog.open(ReservationFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
        this.getReservations();
      });
  
  }
}
