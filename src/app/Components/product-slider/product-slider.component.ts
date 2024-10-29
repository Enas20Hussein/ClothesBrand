import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { AccounteService } from '../../Services/Account.service';
import { CartService } from '../../Services/cart.service';



@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [CommonModule,RouterModule,CarouselModule],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent implements OnInit {
  products: any[] = [];  // Array to store products
  groupedProducts: any[][] = [];  // Array to store products grouped in threes

  constructor(private http: HttpClient,private proserv:ProductsService,private route:ActivatedRoute,private cartService:CartService ,private accserv:AccounteService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.proserv.getAllProSlider().subscribe(
      (data: any) => {
        this.products = data;  // Ensure the data structure matches what you're using
        console.log(this.products)
        this.groupProducts();  // Group the products in sets of three
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Group products in sets of three
  groupProducts(): void {
    for (let i = 0; i < this.products.length; i += 3) {
      this.groupedProducts.push(this.products.slice(i, i + 3));
    }
  }

  
 

}
