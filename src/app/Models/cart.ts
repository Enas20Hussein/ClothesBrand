export interface Cart {
  userId: string;                 // ID of the user owning the cart
  items: CartItem[];              // Array of cart items
  totalPrice: number;             // Total price of all items in the cart
  totalQuantity: number;          // Total quantity of all items in the cart
}

export interface CartItem {
  productId: number;              // ID of the product in the cart
  productName: string;            // Name of the product
  quantity: number;               // Quantity of the product in the cart
  price: number;                  // Price of a single product
  totalItemPrice: number;         // Total price for this item (price * quantity)
}