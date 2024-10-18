import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from '../Models/cart';
import { AccounteService } from './Account.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private apiUrl = 'https://localhost:7108/api/ShoppingCart/';
  private cartDataSubject = new BehaviorSubject<any>(null); // Cart data observable
  private cartCountSubject = new BehaviorSubject<number>(0); // To track cart count

  constructor(private http: HttpClient, private auth:AccounteService) {}


  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  // Method to update cart count
  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

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

    
    return this.http.post(`${this.apiUrl}add?userId=${userId}`, body,{headers}).pipe(
      tap(() => this.updateCartCountAfterChange(userId))); // Update cart count after adding

  }
  updateCartCountAfterChange(userId: string | null) {
    this.getCartByUserId(userId!).subscribe((cart) => {
      if (cart && cart.items) {
        this.updateCartCount(cart.items.length);  // Update count based on the number of items
      } else {
        this.updateCartCount(0);  // Set cart count to 0 if no items are found
      }
    });
  }
  

  deleteToCart(userId: string|null, productId: number): Observable<any> {
    const body = {
      productId: productId
      
    };
    const headers = this.auth.getAuthHeaders(); // Get the authorization header

    return this.http.delete(`${this.apiUrl}remove/${userId}/${productId}`,{headers}).pipe(
      tap(() => this.updateCartCount(0)) 
    );
  }

  clearCart(userId: string|null){
    const headers = this.auth.getAuthHeaders(); // Get the authorization header
    return this.http.delete(`${this.apiUrl}clear/${userId}`,{headers});

  }
}
