import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HotelService } from '../services/HotelService';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Hotel } from '../models/Hotel';
import { HotelformComponent } from './hotelform/hotelform.component';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../admin-client1/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-hotel1',
  templateUrl: './admin-hotel1.component.html',
  styleUrl: './admin-hotel1.component.css'
})
export class AdminHotel1Component implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'description', 'image', 'contact_email','contact_phone', 'price', 'starnumber', 'city', 'action'];
  dataSource = new MatTableDataSource<Hotel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public HS: HotelService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getHotels(); 
  }

  onEdit(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.HS.getHotelById(id).subscribe((hotel) => {
      dialogConfig.data = hotel;
      const dialogRef = this.dialog.open(HotelformComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(() => {
        this.getHotels();
      })
    });
  }
  getHotels(): void {
    this.HS.getHotels().subscribe((r) => {
      this.dataSource = new MatTableDataSource<Hotel>(r);
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
        this.HS.deleteHotel(id).subscribe(() => {
          this.getHotels();
        });
      }
    });
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(HotelformComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output:", data);
      this.HS.createHotel(data).subscribe(() => {
        this.getHotels();
      });
    });
  }
}