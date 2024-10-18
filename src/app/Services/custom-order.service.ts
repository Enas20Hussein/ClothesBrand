import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomClothingOrder } from '../Models/CustomClothingOrder';
import { AccounteService } from './Account.service';
import { returnCustomClothingOrder } from '../Models/returncustomorder';
@Injectable({
  providedIn: 'root'
})
export class CustomOrderService {
  private apiUrl = 'https://localhost:7108/api/CustomClothingOrder/'

  constructor(private http: HttpClient,private auth:AccounteService) {}



  getOrderById(id: number): Observable<returnCustomClothingOrder> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.get<returnCustomClothingOrder>(`${this.apiUrl}${id}`,{headers});
  }

  createOrder(order: FormData): Observable<returnCustomClothingOrder> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.post<returnCustomClothingOrder>(this.apiUrl, order,{headers});
  }

  updateOrder(id: number, order: CustomClothingOrder): Observable<CustomClothingOrder> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.put<CustomClothingOrder>(`${this.apiUrl}/${id}`, order,{headers});
  }

  deleteOrder(id: number): Observable<void> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.delete<void>(`${this.apiUrl}/${id}`,{headers});
  }

  getUserOrders(userId: string): Observable<CustomClothingOrder[]> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    const url = `${this.apiUrl}/user-orders/${userId}`;
    return this.http.get<CustomClothingOrder[]>(url,{headers})

  }
}
