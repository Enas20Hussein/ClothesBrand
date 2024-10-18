export interface Order {
    orderId: number;
    orderDate: Date;
    totalPrice: number;
    paymentStatus: string;
    orderStatus: string;
    userId: string;
    shippingDetails: ShippingDto;
    orderItems: OrderItemDto[];
  }
  
  export interface ShippingDto {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  
  export interface OrderItemDto {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
  }
  