import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdDetailsComponent } from '../prod-details/prod-details.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ProdDetailsComponent, PaginationComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: any[] = [];
  isFilterApplied = false;
  

  //categories = ['Womens Clothes', 'Mens Clothes', 'Kids Clothes']; // Example categories
  categories: string[] = [];

  filterCriteria = {
    category: '',
    minPrice: null,
    maxPrice: null,
    keyword: ''
  };

  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 4;

  constructor(private productsService: ProductsService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories()
  }

  loadProducts(): void {
    this.productsService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data; // Assign response correctly
        this.totalPages = Math.ceil((data.totalItems || this.products.length) / this.itemsPerPage);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  getCurrentProducts(): any[] {
    if (!this.products || this.products.length === 0) {
      return []; // Return an empty array if products is not set
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToSlide(page: number): void {
    this.currentPage = page;
  }

  // Load filtered products
  loadFilteredProducts(): void {
    const { category, minPrice, maxPrice, keyword } = this.filterCriteria;
    this.productsService.getFilteredProducts(category, minPrice, maxPrice, keyword)
      .subscribe((data: any) => {
        console.log('Filtered Data:', data); // Debugging line
        this.products = data || [];
        this.totalPages = Math.ceil((data.totalItems || this.products.length) / this.itemsPerPage);
        this.cdr.detectChanges();
      });
  }
  
  // Apply filter and reload products
  applyFilter(): void {
    this.currentPage = 1;
    this.loadFilteredProducts();
  }

  // Clear filter and reset product listing
  clearFilter(): void {
    this.isFilterApplied = false;
    this.filterCriteria = { category: '', minPrice: null, maxPrice: null, keyword: '' };
    this.currentPage = 1;
    this.loadProducts();
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe(
      (data: any) => {
        data.forEach((element:any) => {
          console.log(element.name)
          this.categories.push(element.name)

        });
        
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }
}
