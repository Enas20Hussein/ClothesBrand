import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { AccounteService } from '../../Services/Account.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-prod-details',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './prod-details.component.html',
  styleUrl: './prod-details.component.css'
})
export class ProdDetailsComponent implements OnInit {

  product:any=[];
  quantity:number=1;
    constructor(private route: ActivatedRoute,private router:Router,private accserv:AccounteService, private productService: ProductsService,private cartService: CartService // Inject CartService
    ) {}
    ngOnInit(): void {
      const productId: any = this.route.snapshot.paramMap.get('id');
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          console.error('Error fetching product', error); // Handle any errors that occur
        }

      );

      
    }

    addToCart() {
      const productId: any = this.route.snapshot.paramMap.get('id');
      this.cartService.addToCart(this.accserv.getUserId(),productId,this.quantity).subscribe({
        next:(cartResponse)=>{
          this.cartService.updateCartData(cartResponse); // Notify that cart data has been updated
console.log("shaban added To Card");

        },
        error:(error)=>{
            console.error('Error adding product to cart', error); // Handle any errors that occur
            
          }
      }
        // (cartResponse) => {
        //   this.cartService.updateCartData(cartResponse); // Notify that cart data has been updated
        // },
        // (error) => {
        //   console.error('Error adding product to cart', error); // Handle any errors that occur
        //   //this.router.navigate(['/Login'])
        // }
      );
    }
}
