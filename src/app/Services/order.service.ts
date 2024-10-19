import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccounteService } from './Account.service';




@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl ='https://localhost:7108/api/Order/'
  constructor(private http: HttpClient,private auth:AccounteService) { }

  getOrderById(OrderId: number): Observable<any> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.get<any>(`${this.apiUrl}${OrderId}`,{headers});
  }

}
