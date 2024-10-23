import { Component, OnInit } from '@angular/core';
import { CustomOrderService } from '../../Services/custom-order.service';
import { returnCustomClothingOrder } from '../../Models/returncustomorder';
import {Router , RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccounteService } from '../../Services/Account.service';

@Component({
  selector: 'app-my-custom-orders',
  standalone: true,
  imports: [RouterModule , CommonModule],
  templateUrl: './my-custom-orders.component.html',
  styleUrl: './my-custom-orders.component.css'
})
export class MyCustomOrdersComponent implements OnInit{

  customOrders: returnCustomClothingOrder[] = [];
  userId: string | null = null; // Replace with actual userId from authentication



  constructor(private Auth : AccounteService , private customOrderService:CustomOrderService , private router : Router){}

  ngOnInit(): void {

    this.userId = this.Auth.getUserId();


    this.getUserOrders();
  }


  getUserOrders(): void {
    this.customOrderService.getUserOrders(this.userId).subscribe(
      (orders: returnCustomClothingOrder[]) => {
        this.customOrders = orders;
      },
      error => {
        console.error('Error fetching orders', error);
      }
    );
  }

}
