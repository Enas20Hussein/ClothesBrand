import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { AccounteService } from '../../Services/Account.service';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute , RouterModule } from '@angular/router';
import { returnOrder } from '../../Models/returnorder';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{

  orders: returnOrder[] = [];
  error: string | null = null;

  userId : string | null = null;



  constructor(private OrderService : OrderService , private auth : AccounteService){}
  ngOnInit(): void {

    this.userId = this.auth.getUserId();

    this.getUserOrders(this.userId);

  }


  getUserOrders(userId : string | null){


    this.OrderService.getUserOrders(userId).subscribe({

      next:(data : returnOrder[]) => {
        this.orders = data.map(order => ({
          orderId: order.orderId, // If you need to track an ID, you'll need to add this to the API response or create a logic to define it.
          orderDate: order.orderDate,
          totalPrice: order.totalPrice,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
          addressLine1: order.addressLine1,
          addressLine2: order.addressLine2,
          city: order.city,
          state: order.state,
          postalCode: order.postalCode,
          country: order.country
        ,
          orderItems: order.orderItems // Assuming the ItemDto structure matches OrderItemDto
        }));
        this.error = null; // Clear error if successful

        console.log("data fetched successfully" , data);
    },


    error:(err) =>{


      console.error("error fetching orders" , err);
    }
  })
  }


   // Method to get class based on payment status
   getPaymentStatusClass(paymentStatus: string): string {
    switch (paymentStatus.toLowerCase()) {
      case 'paid':
        return 'completed'; // CSS class for completed payments
      case 'unpaid':
        return 'pending'; // CSS class for pending payments
      case 'failed':
      case 'canceled':
        return 'cancelled'; // CSS class for failed or canceled payments
      default:
        return ''; // No class if status is unknown
    }
  }

  // Method to get class based on order status
  getOrderStatusClass(orderStatus: string): string {
    switch (orderStatus.toLowerCase()) {
      case 'shipped':
        return 'completed'; // CSS class for shipped orders
      case 'pending':
        return 'pending'; // CSS class for processing orders
      case 'confirmed':
        return 'completed'; // CSS class for delivered orders
      case 'returned':
      case 'canceled':
        return 'cancelled'; // CSS class for returned or canceled orders
      default:
        return ''; // No class if status is unknown
    }
  }

  }

