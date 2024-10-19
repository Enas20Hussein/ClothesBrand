import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../Models/cart';
import { AccounteService } from './Account.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  

  private apiUrl = 'https://localhost:7108/api/ShoppingCart/';
  private cartDataSubject = new BehaviorSubject<any>(null); // Cart data observable

  constructor(private http: HttpClient, private auth:AccounteService) {}


  getCartData(): Observable<any> {
    return this.cartDataSubject.asObservable();
  }

  // Update the cart data and notify subscribers
  updateCartData(cartData: any): void {
    this.cartDataSubject.next(cartData);
  }

  getCartByUserId(userId: string): Observable<Cart> {
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.get<Cart>(`${this.apiUrl}${userId}`,{headers});
  }

  addToCart(userId: string|null, productId: number, quantity: number): Observable<any> {
    const body = {
      productId: productId,
      quantity: quantity
      
    };
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    
    return this.http.post(`${this.apiUrl}add?userId=${userId}`, body,{headers});
  }
  deleteToCart(userId: string|null, productId: number): Observable<any> {
    const body = {
      productId: productId
      
    };
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.delete(`${this.apiUrl}remove/${userId}/${productId}`,{headers});
  }

  clearCart(userId: string|null){
    const headers = this.auth.getAuthHeaders(); // Get the authorization header
    return this.http.delete(`${this.apiUrl}clear/${userId}`,{headers});

  }
}
