import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { AccounteService } from '../../Services/Account.service';
import { CommonModule } from '@angular/common';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // <-- Import FormsModule



@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  stripe: any;
  cardElement: any;
  // shippingDetails: any = {
  //   address: {
  //     AddressLine1: '',
  //     AddressLine2: '',
  //     City: '',
  //     State: '',
  //     postal_code: '',  // lowercase with underscore
  //     Country: ''
  //    },
  //   shippingMethod: ''
  // };
  shippingDetails:any = {
    AddressLine1: '',
    AddressLine2: '',
    City: '',
    State: '',
    postal_code: '',  // Remember to update this to 'PostalCode'
    Country: '',
    ShippingMethod: ''
  };
  
  shippingMethods: string[] = ['Standard', 'Express', 'International' ,'NA'];
  userId: string|null = null;  
  cartData: any;

  constructor(private cartService: CartService,private accserv:AccounteService,private router:Router,private http: HttpClient) {  }
  async ngOnInit() {

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
    this.cartService.getCartData().subscribe((cartData) => {
      if (cartData) {
        this.cartData = cartData;
      }
    });

    // Initial load of cart data
    this.cartService.getCartByUserId(this.userId).subscribe(
      (response) => {
        this.cartData = response;
      },
      (error) => {
        console.error('Error retrieving cart data', error);
      }
    );
  };

  async onCheckout() {
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      console.error('Error creating payment method:', error);
      // Handle error (show error message to user)
    } else {
      console.log('Payment method created:', paymentMethod);
      // Call your backend API with paymentMethod.id
      this.checkout(paymentMethod.id);
    }
  }

  checkout(paymentMethodId: string) {
    const requestBody = {
      userId: this.userId, 
      shippingDetails: {
        AddressLine1: this.shippingDetails.AddressLine1,
        AddressLine2: this.shippingDetails.AddressLine2,
        City: this.shippingDetails.City,
        State: this.shippingDetails.State,
        PostalCode: this.shippingDetails.postal_code,  // Change to PostalCode
        Country: this.shippingDetails.Country,
        ShippingMethod: this.shippingDetails.ShippingMethod  // Add this line if missing
      }, 
      paymentDto: {
        paymentMethodId: paymentMethodId
      }
    };
    console.log('Request body:', requestBody);
    this.http.post('https://localhost:7108/api/ShoppingCart/checkout', requestBody).subscribe(
      (response: any) => {
        console.log('Order successful:', response);
      },
      (error) => {
        console.error('Error during checkout:', error);
      }
    );
  }
  
}

