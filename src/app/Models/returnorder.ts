export interface returnOrder {
  orderId: number;
  orderDate: string;             // Keeping as string since the format is ISO string
  totalPrice: number;
  paymentStatus: string;
  orderStatus: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  orderItems: OrderItem[];        // Array of order items
}

export interface OrderItem {
  quantity: number;
  price: number;
  productName: string;
  imageUrl: string;               // Not optional, since it's provided in your example
}
