import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartSharedService {
  private cartNumberSource = new BehaviorSubject<number>(0); // Default cart number
  currentCartNumber = this.cartNumberSource.asObservable();

  // Method to update the cart number
  updateCartNumber(cartNumber: number) {
    this.cartNumberSource.next(cartNumber);
  }
}
