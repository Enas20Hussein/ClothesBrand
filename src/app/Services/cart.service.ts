import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../Models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://localhost:7108/api/ShoppingCart/';
  
  constructor(private http: HttpClient) {}

  getCartByUserId(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}${userId}`);
  }

   addToCart(product: any): Observable<any> {
    const userId = localStorage.getItem('userId'); // Assuming you already store the userId
    const cartItem = {
      userId: userId,
      productId: product.id,
      quantity: 1, // or any quantity logic you want to add
    };
    return this.http.post<any>(`${this.apiUrl}add`, cartItem); // Adjust the endpoint as necessary
  }
}
