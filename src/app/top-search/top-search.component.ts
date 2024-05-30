import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../models/Hotel';
import { HotelService } from '../services/HotelService';
import { Region } from '../models/Region';
import { RegionService } from '../services/RegionService';

@Component({
  selector: 'app-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.css']
})
export class TopSearchComponent implements OnInit {
  regionName!: string;
  starNumber!: string;
  searchQuery: string = ''; // Add searchQuery property
  allHotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  selectedRegion: Region | undefined;
  regions: Region[] = [];

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private regionService: RegionService
  ) { }

  ngOnInit(): void {
    // Retrieve the region name and star number parameters from the route
    this.route.queryParams.subscribe(params => {
      this.regionName = params['region'];
      this.starNumber = params['starsNumber'];
      console.log('Region Name:', this.regionName);
      console.log('Star Number:', this.starNumber);
      this.fetchHotels(); // Fetch hotels on component initialization
    });
  }

  // Method to fetch hotels based on region and star number
  fetchHotels(): void {
    this.regionService.getRegions().subscribe(
      (regions: Region[]) => {
        this.regions = regions;
        this.selectedRegion = this.regions.find(region => region.name === this.regionName);
        if (this.selectedRegion) {
          this.hotelService.getHotels().subscribe(
            (hotels: Hotel[]) => {
              this.allHotels = hotels;
              this.filteredHotels = this.allHotels.filter(hotel => 
                hotel.region_id === this.selectedRegion!.id && hotel.starnumber === this.starNumber
              );
            },
            (error) => {
              console.error('Error fetching hotels:', error);
            }
          );
        } else {
          console.error('Region not found:', this.regionName);
        }
      },
      (error) => {
        console.error('Error fetching regions:', error);
      }
    );
  }

  // Method to handle hotel name search
  searchByName(): void {
    if (this.searchQuery.trim() !== '') {
      this.filteredHotels = this.allHotels.filter(hotel =>
        hotel.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // If search query is empty, display all hotels based on region and star number
      this.fetchHotels();
    }
  }
}
