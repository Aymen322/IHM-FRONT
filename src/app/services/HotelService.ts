import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/Hotel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'http://127.0.0.1:8000/api/hotels';

  constructor(private http: HttpClient) { }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.baseUrl);
  }

  getHotel(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/${id}`);
  }

  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.baseUrl, hotel);
  }

  updateHotel(id: number, hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.baseUrl}/${id}`, hotel);
  }

  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getHotelsByRegion(regionId: number): Observable<Hotel[]> {
    return this.getHotels().pipe(
      map(hotels => hotels.filter(hotel => hotel.region_id === regionId))
    );
  }
  getHotelsByStarNumber(starnumber: string): Observable<Hotel[]> {
    return this.getHotels().pipe(
      map(hotels => hotels.filter(hotel => hotel.starnumber === starnumber))
    );
  }
  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/${id}`);
  }
}
