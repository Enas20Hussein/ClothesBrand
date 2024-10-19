import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../Services/order.service';  // OrderService to fetch order details
import { Order } from '../../Models/order';  // Import the Order interface
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { returnOrder } from '../../Models/returnorder';

@Component({
  selector: 'app-cofirmed-order',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './cofirmed-order.component.html',
  styleUrl: './cofirmed-order.component.css'
})
export class CofirmedOrderComponent {
  orderId: number =0;
  order: returnOrder | null = null;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    // Get orderId from the URL
    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;

    // Fetch order details using the orderId
    this.orderService.getOrderById(this.orderId).subscribe(
      (orderDetails : returnOrder) => {
        this.order = orderDetails;
        console.log('Order details:', this.order);
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }
}
