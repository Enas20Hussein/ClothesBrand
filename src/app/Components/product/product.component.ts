import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(private products:ProductsService){

  }
  product:any=[];
  ngOnInit(){
    this.loadProducts();
  }


  loadProducts(){
    this.products.getAllProducts().subscribe((products:any)=>{
      console.log(products);
      this.product=products;
    })
  }

}
