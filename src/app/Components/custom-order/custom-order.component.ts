import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomOrderService } from '../../Services/custom-order.service';
import { returnCustomClothingOrder } from '../../Models/returncustomorder';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-order-details',
  standalone: true,  // Standalone component
  imports: [CommonModule],  // Include CommonModule here
  templateUrl: './custom-order.component.html',
  styleUrls: ['./custom-order.component.css']
})
export class CustomOrderComponent implements OnInit {
  orderId: number = 0;
  order: returnCustomClothingOrder | null = null;

  constructor(
    private route: ActivatedRoute,
    private customOrderService: CustomOrderService
  ) {}

  ngOnInit(): void {
    // Get the orderId from the route parameter
    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
    if (this.orderId) {
      this.getOrderById(this.orderId);
    }
  }

  getOrderById(orderId: number): void {
    this.customOrderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order; // Order data fetched by id
      },
      error: (error) => {
        console.error('Error fetching order:', error);
      }
    });
  }
}
