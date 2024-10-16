import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule,],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartData: any;
  userId: string|null = null;  
  subtotal: number = 0;
  dataloaded:any;
  
  constructor(private cartService: CartService,private accserv:AccounteService,private router:Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      console.error('User ID is missing');
      return;
    }

    // Subscribe to cart updates
    this.cartService.getCartData().subscribe((cartData) => {
      if (cartData) {
        this.cartData = cartData;
      }
    });

    // Initial load of cart data
    this.cartService.getCartByUserId(this.userId).subscribe(
      (response) => {
        this.cartData = response;
      },
      (error) => {
        console.error('Error retrieving cart data', error);
      }
    );
  }


  deleteToCart(prodId: number) {
    if (this.userId) {
      this.cartService.deleteToCart(this.userId, prodId).subscribe(
        (response) => {
          console.log('Item removed successfully:', response);
          
          // Update cart after deletion
          this.cartService.getCartByUserId(this.userId!).subscribe(
            (cartResponse) => {
              this.cartService.updateCartData(cartResponse);
            }
          );
        },
        (error) => {
          console.error('Error deleting product from cart', error);
        }
      );
    }
  }


  clearcart(){
    const UserId = this.accserv.getUserId() || ''; // Fallback to empty string if null
      this.cartService.clearCart(UserId).subscribe(
        (response) => {
          console.log('Cart cleared successfully:', response);
          this.cartService.getCartByUserId(this.userId!).subscribe(
            (cartResponse) => {
              this.cartService.updateCartData(cartResponse);
            }
          );
        },
        (error) => {
          console.error('Error deleting product from cart', error); // Handle any errors that occur
        }
      );
  }
  
  goToOrderPage() {
   this.router.navigate(['/order']);
  }
  

 
  

 

}
