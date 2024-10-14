import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  userId: string = '';  
  subtotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    if (!this.userId) {
      console.error('User ID is missing');
    } else {
      this.loadCart();
    }
  }
  

  loadCart(): void {
    this.cartService.getCartByUserId(this.userId).subscribe({
      next: (data) => {
        console.log('Cart data:', data);  // Log the response
        if (data && data.items) {
          this.cartItems = data.items;
          this.calculateSubtotal();
        } else {
          console.error('No items found in the response');
          this.cartItems = [];
        }
      },
      error: (err) => {
        console.error('Error fetching cart data:', err);
        this.cartItems = [];
      }
    });
  }
  

  calculateSubtotal() {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

}
