import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ClientService } from '../services/ClientService';
import { HotelService } from '../services/HotelService';
import { ReservationService } from '../services/ReservationService';
import { RegionService } from '../services/RegionService';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard1',
  templateUrl: './admin-dashboard1.component.html',
  styleUrls: ['./admin-dashboard1.component.css']
})
export class AdminDashboard1Component implements OnInit {
  data_hotel: string[] = [];
  data_m: number[] = [];

  // Pie chart (Clients by Hotel)
  public chartLabelspie: string[] = [];
  public chartDatapie: any[] = []; // Change type to any[] because the structure is dynamic
  public pieChartLegend = true;
  chartOptionspie: ChartOptions = {};

  // Bar chart (Reservations by Hotel)
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartLegend = true;
  public barChartData: ChartDataset[] =[
    {
      label: 'Reservations by Hotel',
      data: []
    }
  ];

  // Line chart (Hotels by Region)
  public lineChartData: ChartDataset[] = []; 
  public chartLabels: String[] = [];
  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;

  // Count data
  nb_Clients!: number;
  nb_Hotels!: number;
  nb_Regions!: number;
  nb_Reservations!: number;

  constructor(
    private clientService: ClientService,
    private hotelService: HotelService,
    private reservationService: ReservationService,
    private regionService: RegionService
  ) { }

  ngOnInit(): void {
    this.getHotel();
  
    forkJoin([
      this.clientService.getClients(),
      this.hotelService.getHotels(),
      this.reservationService.getReservations(),
      this.regionService.getRegions()
    ]).subscribe(([clients, hotels, reservations, regions]) => {
      this.nb_Clients = clients.length;
      this.nb_Hotels = hotels.length;
      this.nb_Reservations = reservations.length;
      this.nb_Regions = regions.length;

      const clientsByHotel: number[] = [];
      hotels.forEach((hotel: { id: number; }) => {
        let reservationsCount = reservations.filter(reservation => reservation.hotel_id === hotel.id).length;
        this.barChartData[0].data.push(reservationsCount);
      });

      const hotelsByRegion: number[] = [];
      regions.forEach((region: { id: number; }) => {
        let hotelsCount = hotels.filter(hotel => hotel.region_id === region.id).length;
        hotelsByRegion.push(hotelsCount);
      });

      this.lineChartData.push({
        label: 'Hotels by Region',
        data: hotelsByRegion
      });
      this.chartLabels = regions.map((region: { name: string; }) => region.name);
    });
  }

  getHotel() {
    this.hotelService.getHotels().subscribe((res) => {
      this.nb_Hotels = res.length;
      for (let i = 0; i < this.nb_Hotels; i++) {
        this.data_hotel.push(res[i].name);
        this.data_m.push(res[i].city.length);
      }
      this.chartLabelspie = this.data_hotel;
    });
  }
}
