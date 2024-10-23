import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { OurServicesComponent } from "../our-services/our-services.component";
import { RouterModule } from '@angular/router';
import { AboutComponent } from "../about/about.component";
import { ProductsService } from '../../Services/products.service';
import { ProductSliderComponent } from '../product-slider/product-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent,RouterModule, OurServicesComponent,ProductSliderComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productslider: any[] = []; // Array to hold product data
 constructor(private productsService:ProductsService ){}

  private slideInterval: any;

  // OnInit lifecycle hook to start the auto slider
  ngOnInit(): void {
  }

  // OnDestroy lifecycle hook to clear the interval when the component is destroyed
  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // loadProducts(): void {
  //   this.productsService.getAllProducts().subscribe((data: any) => {
  //     this.productslider = data;
  //   });
  // }




}
