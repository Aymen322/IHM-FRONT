import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Region } from '../../models/Region';
import { FormGroup, FormBuilder } from "@angular/forms";
import { RegionService } from '../../services/RegionService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-region',
  templateUrl: './create-region.component.html',
  styleUrls: ['./create-region.component.css']
})
export class CreateRegionComponent implements OnInit {
  regionForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private regionService: RegionService
  ) {
    this.regionForm = this.formBuilder.group({
      name: [''],
      image: [''],
      description: [''],
      score: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.regionService.createRegion(this.regionForm.value).subscribe(() => {
      console.log("Region created successfully!");
      window.location.reload();
    });
  }

  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";
  region: Region = {} as Region; // Corrected the instantiation

  addRegion(): void {
    this.regionService.createRegion(this.region).subscribe((data) => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
  }

  openModal(): void {
    this.display = "block";
  }

  closeModal(): void {
    this.display = "none";
  }
}
