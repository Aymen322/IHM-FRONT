import { Component, OnInit} from '@angular/core';
import { HotelService } from '../services/HotelService';
import { Hotel } from '../../app/models/Hotel';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'admin-hotel',
  templateUrl: './admin-hotel.component.html',
  styleUrls: ['./admin-hotel.component.css']
})
export class AdminHotelComponent {
  hotels: Hotel[] = [];
  columns: string[] = ['name','description','image','contact_email','city','contact_phone','promotion','review','price','_id'];

  constructor(public HotelService: HotelService,private dialog: MatDialog) { }
  ngOnInit(): void {
    this.HotelService.getHotels().subscribe(
      (data: any) => {
        // Assuming 'data' is the API response containing client data
        this.hotels = data as Hotel[]; // Assigning response to clients array
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }
  
  deleteHotel(id: number): void {
      // Show confirmation dialog before deleting
      if (confirm('Are you sure you want to delete this client ?')) {
        // Call service method to delete beneficiary
        this.HotelService.deleteHotel(id).subscribe(
          () => {
            console.log('formation deleted successfully');
            // Refresh beneficiary list after deletion
            this.HotelService.getHotels();
          })
      };
    }

}
