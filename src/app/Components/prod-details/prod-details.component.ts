import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { AccounteService } from '../../Services/Account.service';


@Component({
  selector: 'app-prod-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './prod-details.component.html',
  styleUrl: './prod-details.component.css'
})
export class ProdDetailsComponent implements OnInit {

  product:any=[];
  
    constructor(private route: ActivatedRoute,private accserv:AccounteService, private productService: ProductsService,private cartService: CartService // Inject CartService
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
      this.cartService.addToCart(this.accserv.getUserId(),productId,1).subscribe(
        (cartResponse) => {
          this.cartService.updateCartData(cartResponse); // Notify that cart data has been updated
        },
        (error) => {
          console.error('Error adding product to cart', error); // Handle any errors that occur
        }
      );
    }
}
