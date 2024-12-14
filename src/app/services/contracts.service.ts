import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private baseUrl = 'http://localhost:8080/api/v1/contracts';

  constructor(private http: HttpClient) {}

  addContract(contract: any): Observable<any> {
    return this.http.post(this.baseUrl, contract);
  }

  getContracts(): Observable<any> {
    return this.http.get(this.baseUrl); // Ensure your backend supports this GET endpoint
  }
}
