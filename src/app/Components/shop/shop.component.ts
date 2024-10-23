import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'] // Update to 'styleUrls'
})
export class ShopComponent {
  products: any[] = [];
  categories: string[] = ['Women Clothes', 'Kids Clothes', 'Sportswear', "Men Clothes"];
  selectedCategory: string = 'Women Clothes';
  minPrice: number = 0;
  maxPrice: number = 100;
  keyword: string = '';

  constructor(private productServ: ProductsService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.productServ.getFilteredProducts(this.selectedCategory, this.minPrice, this.maxPrice, this.keyword).subscribe(
      (data) => {
        this.products = data; // Assuming the API returns an array of products
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters(); // Apply filters after updating the category
  }

  selectallproduct(): void {
    this.productServ.getAllProducts().subscribe((data: any) => {
      this.products = data;
    });
  }
}
