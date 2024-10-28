export interface CustomClothingOrder {
  designDescription: string;
  fabricDetails: string;
  depositAmount: number;
  customOrderStatus: string;
  shoulderWidth: number;
  chestCircumference: number;
  waistCircumference: number;
  hipCircumference: number;
  waistLength: number;
  armLength: number;
  bicepSize: number;
  modelLength: number;
  customerName : string;
  phoneNumber : string;
  image: File | null;
  userId: string | null;
}
