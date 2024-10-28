import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccounteService } from '../../Services/Account.service';
import { Router } from '@angular/router';
import { CartSharedService } from '../../Services/cart-shared.service';
import { AuthInterceptor } from '../../Models/AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsService } from '../../Services/products.service';
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
    let id=this.userId
setTimeout(()=>{ this.loadCartData(id);},100);
   

    // Subscribe to cart updates
    this.cartService.getCartData().subscribe((cartData) => {
      console.log("called getCartData");
      if (cartData) {
        console.log("enter conditions CArd");

        this.cartData = cartData;
        console.log(this.cartData)
      }
      else{
        console.log(cartData)
        console.log("skjfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      }
    });

    // Initial load of cart data
    this.cartService.getCartByUserId(this.userId).subscribe({
      next:(response) => {
        console.log("enter to getCartByUserId");
        console.log(response);

        this.cartData = response;
        this.cartnumber = this.cartData.shoppingCartItems.length;
        console.log(this.cartnumber);
        this.cartSharedService.updateCartNumber(this.cartnumber); // Update shared cart number

      },
     error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/Login']); // Navigate to login on 401 error
        } else {
          console.error('Error fetching data', error);
        }
      }
  });

  }

  loadCartData(userid : string) {
    this.cartService.getCartByUserId(userid).subscribe({
     next: (response) => {
      console.log("after Logging 3 s");
        this.cartData = response;
        this.cartnumber = this.cartData.shoppingCartItems.length; // Assuming cartData is an array of items
        this.cartSharedService.updateCartNumber(this.cartnumber);  // Update shared cart number
        console.log(this.cartData.shoppingCartItems)
      },
     error: (error) => {
        console.error('Error retrieving cart data', error);
      }
  });
  }

  // pluscount(){
  //   this.cartData.shoppingCartItems.quantity+=1;
  // }
  // Mincount(){
  //   this.cartData.shoppingCartItems.quantity-=1;
  // }

  deleteToCart(prodId: number) {
    if (this.userId) {
      this.cartService.deleteToCart(this.userId, prodId).subscribe(
        (response) => {
          console.log('Item removed successfully:', response);

          // Update cart after deletion
          this.cartService.getCartByUserId(this.userId!).subscribe(
            (cartResponse) => {
              this.cartData=cartResponse;
              console.log("Shaban Delete this item")
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
      this.cartService.clearCart(UserId).subscribe({
      next:  (response) => {
          console.log('Cart cleared successfully:', response);
          this.cartService.getCartByUserId(this.userId!).subscribe(
            (cartResponse) => {
              console.log("Shaban Clear this card")
              console.log(cartResponse);
              this.cartData=null;
              this.cartService.updateCartData(cartResponse);
              this.cartnumber = 0; // Reset cart number after clearing
              this.cartSharedService.updateCartNumber(this.cartnumber);
            }
          );
        },
       error: (error) => {
          if (error.status === 401) {
            this.router.navigate(['/Login']); // Navigate to login on 401 error
          } else {
            console.error('Error fetching data', error);
          }
        }
  });
  }

  goToOrderPage() {
   this.router.navigate(['/order']);
  }




}
