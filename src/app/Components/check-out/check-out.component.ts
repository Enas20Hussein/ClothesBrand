import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { AccounteService } from '../../Services/Account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit {
constructor(private route: ActivatedRoute,private accserv:AccounteService,private router:Router,private orderService:OrderService,private http:HttpClient){}

  stripe: any;
  cardElement: any;
  userId: string|null = null; 
  order: any;
  orderId: number = 0;
  async ngOnInit() {
    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
    console.log('Order ID from route:', this.orderId);
    
    this.stripe = await loadStripe("pk_test_51Q7PfwBzrGISKilkwaR00D7vJn68wZL6qHcXEsOhNMbATTbOL7K6PUxWdBK5ARpAEWEPSEVjpBG31BlKFtena4MC00IPm2z6Fp"); // Replace with your Stripe publishable key
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');

    this.userId = localStorage.getItem('userId')||'';
    if (!this.accserv.getUserId()) {
      console.error('User ID is missing');
      this.router.navigate(['/login']);
      return;
    }
  }

  getOrderDetails(): void {
    this.orderService.getOrderById(this.orderId).subscribe(
      (data) => {
        this.order = data;
        console.log('Order details:', this.order);
      },
      (error) => {
        console.error('Error fetching order:', error);
      }
    );
  }

  async onCheckout(event: Event) {
    event.preventDefault();  // Prevent form from submitting
  
    // Create payment method via Stripe
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });
  
    if (error) {
      console.error('Error creating payment method:', error);
      // Show error message to the user, if needed
    } else {
      console.log('Payment method created:', paymentMethod);
      // Proceed with the backend API call
      this.ProceedToPayment(paymentMethod.id);
    }
  }
  
  ProceedToPayment(paymentMethodId: string) {
    const requestBody = {
     
        paymentMethodId: paymentMethodId
      
    };
    console.log('Request body:', requestBody);
    const headers = this.accserv.getAuthHeaders(); // Get the authorization header

    this.http.post(`https://localhost:7108/api/ShoppingCart/payment/${this.userId}/${this.orderId}`,requestBody,{headers}).subscribe(
      (response: any) => {
        console.log('Order successful:', response);
      },
      (error) => {
        console.error('Error during checkout:', error);
      }
    );
  }

}
