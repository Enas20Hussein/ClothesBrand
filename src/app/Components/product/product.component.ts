import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule],
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
