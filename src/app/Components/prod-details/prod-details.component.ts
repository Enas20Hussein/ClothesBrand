import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';


@Component({
  selector: 'app-prod-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './prod-details.component.html',
  styleUrl: './prod-details.component.css'
})
export class ProdDetailsComponent implements OnInit {

  product:any=[];
  
    constructor(private route: ActivatedRoute, private productService: ProductsService,private cartService: CartService // Inject CartService
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
      this.cartService.addToCart(this.product).subscribe(
        (response) => {
          console.log(`${this.product.name} added to cart`, response);
        },
        (error) => {
          console.error('Error adding product to cart', error); // Handle any errors that occur
        }
      );
    }
}
