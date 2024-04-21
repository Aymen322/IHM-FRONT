import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../models/Hotel';
import { HotelService } from '../services/HotelService';

@Component({
  selector: 'app-top-destinations',
  templateUrl: './top-destinations.component.html',
  styleUrls: ['./top-destinations.component.css']
})
export class TopDestinationsComponent implements OnInit {
  regionId!: number; // Change type to number
  hotels!: Hotel[];
  searchQuery: string = '';
  filteredHotels: Hotel[] = [];

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.regionId = Number(params.get('regionId')); // Convert to number
      this.getHotelsByRegion(this.regionId);
    });
  }

  getHotelsByRegion(regionId: number): void {
    this.hotelService.getHotelsByRegion(regionId).subscribe(
      (hotels: Hotel[]) => {
        this.hotels = hotels;
        this.filteredHotels = this.hotels; // Initialize filteredHotels with all hotels
      },
      (error) => {
        console.error('Error fetching hotels by region:', error);
      }
    );
  }

  searchByName(): void {
    if (this.searchQuery.trim() !== '') {
      this.filteredHotels = this.hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // If search query is empty, reset filteredHotels to all hotels
      this.filteredHotels = this.hotels;
    }
  }
}
