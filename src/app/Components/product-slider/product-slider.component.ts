import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent implements OnInit {
  products: any = [];
  activeIndex = 0;
  intervalId: any;
  direction: 'next' | 'prev' = 'next';
  currentIndex: number = 0;
  timeoutId?: number;

  autoSlideInterval: any;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getAllProSlider().subscribe(
      (data) => {
        this.products = data;
        this.startAutoSlide();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // 6 seconds interval
  }

  nextSlide(): void {
    this.direction = 'next';
    this.activeIndex = (this.activeIndex + 1) % this.products.length;
  }

  prevSlide(): void {
    this.direction = 'prev';
    this.activeIndex =
      (this.activeIndex - 1 + this.products.length) % this.products.length;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval when the component is destroyed
    }
  }
}
