export interface Cart {
  userId: string;  
  totalPrice: number;             
  shoppingCartItems: CartItem[];              
             
}

export interface CartItem {
  productId: number;              // ID of the product in the cart
  productName: string;            // Name of the product
  quantity: number;               // Quantity of the product in the cart
  price: number;                  // Price of a single product
}