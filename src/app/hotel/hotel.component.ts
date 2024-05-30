import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/Hotel';
import { HotelService } from '../services/HotelService';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }
}
