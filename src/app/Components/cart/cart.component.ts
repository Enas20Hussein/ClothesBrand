import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { Router } from '@angular/router';
import { CartSharedService } from '../../Services/cart-shared.service';
import { AuthInterceptor } from '../../Models/AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule,],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Provide the interceptor here
  ]
})
export class CartComponent implements OnInit {
  cartData: any;
  userId: string|null = null;
  subtotal: number = 0;
  dataloaded:any;
  cartnumber: number = 0;


  constructor(private cartService: CartService,private accserv:AccounteService,private router:Router,private cartSharedService: CartSharedService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      console.error('User ID is missing');
      return;
    }

    this.loadCartData(this.userId);

    // Subscribe to cart updates
    this.cartService.getCartData().subscribe((cartData) => {
      if (cartData) {
        this.cartData = cartData;
        console.log(this.cartData)
      }
    });

    // Initial load of cart data
    this.cartService.getCartByUserId(this.userId).subscribe(
      (response) => {
        this.cartData = response;
        this.cartnumber = this.cartData.shoppingCartItems.length;
        console.log(this.cartnumber);
        this.cartSharedService.updateCartNumber(this.cartnumber); // Update shared cart number

      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/Login']); // Navigate to login on 401 error
        } else {
          console.error('Error fetching data', error);
        }
      }
    );

  }

  loadCartData(userid : string) {
    this.cartService.getCartByUserId(userid).subscribe(
      (response) => {
        this.cartData = response;
        this.cartnumber = this.cartData.shoppingCartItems.length; // Assuming cartData is an array of items
        this.cartSharedService.updateCartNumber(this.cartnumber);  // Update shared cart number
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
              this.cartnumber = this.cartData.shoppingCartItems.length;
              this.cartSharedService.updateCartNumber(this.cartnumber);  // Update shared service

            }
          );
        },
        (error) => {
          if (error.status === 401) {
            this.router.navigate(['/Login']); // Navigate to login on 401 error
          } else {
            console.error('Error fetching data', error);
          }
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
              this.cartnumber = 0; // Reset cart number after clearing
              this.cartSharedService.updateCartNumber(this.cartnumber);
            }
          );
        },
        (error) => {
          if (error.status === 401) {
            this.router.navigate(['/Login']); // Navigate to login on 401 error
          } else {
            console.error('Error fetching data', error);
          }
        }
      );
  }

  goToOrderPage() {
   this.router.navigate(['/order']);
  }







}
