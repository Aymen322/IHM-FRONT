import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HotelService } from '../../services/HotelService';
import { Hotel } from '../../models/Hotel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css']
})
export class CreateHotelComponent implements OnInit {
  hotelForm: FormGroup;
  display = "none";
  hotels: Hotel = {} as Hotel; // Initialize as an empty object

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private hotelService: HotelService
  ) {
    this.hotelForm = this.formBuilder.group({
      name: [''],
      description: [''],
      image: [''],
      contact_email: [''],
      city: [''],
      contact_phone: [''],
      promotion: [''],
      review: [''],
      price: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.hotelService.createHotel(this.hotelForm.value).subscribe(() => {
      console.log("Hotel created successfully!");
      window.location.reload();
    });
  }

  addHotel = (): void => {
    this.hotelService.createHotel(this.hotels).subscribe((data) => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
  };

  openModal(): void {
    this.display = "block";
  }

  closeModal(): void {
    this.display = "none";
  }
}
