export interface returnCustomClothingOrder {
  id: number;
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
  imageUrl: string;
  userId: string | null;
}
