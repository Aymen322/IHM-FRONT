// region.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/Region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
 
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) { }

  // Fetch all regions from the backend
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.apiUrl}/regions`);
  }

  // Fetch a single region by ID from the backend
  getRegion(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.apiUrl}/regions/${id}`);
  }

  // Create a new region
  createRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(`${this.apiUrl}/regions`, region);
  }
  
  getRegionById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.apiUrl}/${id}`);
  }

  // Update an existing region
  updateRegion(region: Region): Observable<Region> {
    return this.http.put<Region>(`${this.apiUrl}/regions/${region.id}`, region);
  }

  // Delete a region
  deleteRegion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/regions/${id}`);
  }

  getRegionsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
