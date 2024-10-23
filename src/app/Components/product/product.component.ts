import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdDetailsComponent } from '../prod-details/prod-details.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CommonModule,ProdDetailsComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: any[] = []; // Array to hold product data
  currentIndex = 0; // Track the current page of products
  slidesPerView = 3; // Number of slides to show per view
  totalPages!: number; // Total pages based on the number of products

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    //this.products;
    this.loadProducts(); // Fetch product data
  }

  loadProducts(): void {
    this.productsService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      // this.totalPages = Math.ceil(this.products.length / this.slidesPerView)-1;
    });
  }

  // Get the products for the current slide
  getCurrentProducts(): any[] {
    const start = this.currentIndex * this.slidesPerView;
    const end = start + this.slidesPerView;
    return this.products.slice(start, end+2);
  }

  // Move to the next set of slides
  nextSlide(): void {
    if (this.currentIndex < this.totalPages - 1) {
      this.currentIndex++;
    }

  }

  // Move to the previous set of slides
  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Navigate to a specific slide using pagination dots
  goToSlide(index: number): void {
    this.currentIndex = index;
  }
  }
  