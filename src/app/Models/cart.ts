
export interface CartItem {
    productId: string;
    quantity: number;
    userId:string
    
  }
  
  export interface Cart {
    items: CartItem[];
  }
  