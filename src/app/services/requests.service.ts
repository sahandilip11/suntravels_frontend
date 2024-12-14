import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RoomType {
  typeName: string;
  maxNoAdults: number;
  perPersonPrice: number;
}

export interface SearchResult {
  hotelName: string;
  availabilityStatus: string;
  price: number;
  roomType: RoomType[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private baseUrl = 'http://localhost:8080/api/v1/search'; // Backend API URL

  constructor(private http: HttpClient) {}

  searchRequests(request: any): Observable<SearchResult[]> {
    return this.http.post<SearchResult[]>(this.baseUrl, request);
  }
}
