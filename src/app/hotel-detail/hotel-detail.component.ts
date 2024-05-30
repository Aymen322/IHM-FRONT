import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../services/HotelService';
import { CategoryHotelService } from '../services/CategoryHotelService';
import { ReservationService } from '../services/ReservationService';
import { ClientService } from '../services/ClientService';
import { Hotel } from '../models/Hotel';
import { CategoryHotel } from '../models/CategoryHotel';
import { Reservation } from '../models/Reservation';
import { Client } from '../models/Client';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  hotelId!: number;
  hotel!: Hotel;
  categoryHotel!: CategoryHotel;
  bookingForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private categoryHotelService: CategoryHotelService,
    private reservationService: ReservationService,
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['id'];
      this.hotelService.getHotel(this.hotelId).subscribe(
        (hotel: Hotel) => {
          this.hotel = hotel;
          this.loadCategoryHotel();
        },
        (error) => {
          console.error('Error fetching hotel details:', error);
        }
      );
    });

    this.bookingForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', Validators.required],
      check_in_date: ['', Validators.required],
      check_out_date: ['', Validators.required]
    });
  }

  loadCategoryHotel(): void {
    this.categoryHotelService.getCategoryHotel(this.hotel.category_hotel_id).subscribe(
      (categoryHotel: CategoryHotel) => {
        this.categoryHotel = categoryHotel;
      },
      (error) => {
        console.error('Error fetching category hotel details:', error);
      }
    );
  }

  createClientAndReservation(): void {
    const clientData = {
      firstname: this.bookingForm.value.firstname,
      lastname: this.bookingForm.value.lastname,
      email: this.bookingForm.value.email,
      phonenumber: this.bookingForm.value.phonenumber
    };
  
    this.clientService.createClient(clientData).subscribe(
      (createdClient: Client) => {
        console.log('Client created successfully:', createdClient);
        const reservation: Reservation = {
          client_id: createdClient.id,
          hotel_id: this.hotelId,
          status: 'pending', // Placeholder value
          check_in_date: this.bookingForm.value.check_in_date, 
          check_out_date: this.bookingForm.value.check_out_date // Corrected
        };
  
        this.reservationService.createReservation(reservation).subscribe(
          (createdReservation: Reservation) => {
            console.log('Reservation created successfully:', createdReservation);
            // Optionally, perform further actions after creating the reservation
          },
          (error) => {
            console.error('Error creating reservation:', error);
          }
        );
      },
      (error) => {
        console.error('Error creating client:', error);
      }
    );
  }
  
  onSubmit(): void {
    if (this.bookingForm.valid) {
      this.createClientAndReservation();
      
    }
  }
}
