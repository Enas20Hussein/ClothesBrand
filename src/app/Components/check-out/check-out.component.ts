import { Component, OnInit } from '@angular/core';
import { AccounteService } from '../../Services/Account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeElements, StripeCardNumberElement, StripeCardExpiryElement, StripeCardCvcElement } from '@stripe/stripe-js';



@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit {
constructor(private route: ActivatedRoute,private accserv:AccounteService,private router:Router,private orderService:OrderService,private http:HttpClient){}

  
  userId: string|null = null;
  order: any;
  orderId: number = 0;
  stripe!: Stripe | null;
  elements!: StripeElements;
  cardNumberElement!: StripeCardNumberElement;
  cardExpiryElement!: StripeCardExpiryElement;
  cardCvcElement!: StripeCardCvcElement;

  async ngOnInit() {
    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
    console.log('Order ID from route:', this.orderId);

    this.stripe = await loadStripe("pk_test_51Q7PfwBzrGISKilkwaR00D7vJn68wZL6qHcXEsOhNMbATTbOL7K6PUxWdBK5ARpAEWEPSEVjpBG31BlKFtena4MC00IPm2z6Fp"); // Replace with your Stripe publishable key
    this.elements = this.stripe!.elements();

    // Create Card Number Element
    this.cardNumberElement = this.elements.create('cardNumber');
    this.cardNumberElement.mount('#card-number');

    // Create Card Expiry Element
    this.cardExpiryElement = this.elements.create('cardExpiry');
    this.cardExpiryElement.mount('#card-expiry');

    // Create CVC Element
    this.cardCvcElement = this.elements.create('cardCvc');
    this.cardCvcElement.mount('#card-cvc');

    // Update card display as users type card number and expiry
    this.cardNumberElement.on('change', event => {
      const cardNumberDisplay = document.getElementById('display-card-number');
      if (event.complete) {
        cardNumberDisplay!.innerText = '#### #### #### ####';  // Stripe doesn't give the actual value
      } else {
        cardNumberDisplay!.innerText = 'Invalid Card Number';
      }
    });
  
    this.cardExpiryElement.on('change', event => {
      const cardExpiryDisplay = document.getElementById('display-card-expiry');
      if (event.complete) {
        cardExpiryDisplay!.innerText = 'MM/YY';  // Stripe doesn't give the actual value
      } else {
        cardExpiryDisplay!.innerText = 'Invalid Expiry';
      }
    });

    // Flip card when CVC is focused
    this.cardCvcElement.on('focus', () => this.flipCard(true));
    this.cardCvcElement.on('blur', () => this.flipCard(false));

    this.userId = localStorage.getItem('userId')||'';
    if (!this.accserv.getUserId()) {
      console.error('User ID is missing');
      this.router.navigate(['/login']);
      return;
    }
  }


  flipCard(isFlipped: boolean) {
    const creditCard = document.getElementById('credit-card');
    if (isFlipped) {
      creditCard!.classList.add('flip');
    } else {
      creditCard!.classList.remove('flip');
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
    const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
      type: 'card',
      card: this.cardNumberElement,  // Pass the card element directly
      billing_details: {
        name: 'Card Holder Name',
      }
    });

    if (error) {
      console.error('Error creating payment method:', error);
    } else {
      console.log('Payment successful:', paymentMethod);
      // Proceed with further steps, e.g., send paymentMethod.id to your backend
    }
    

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
