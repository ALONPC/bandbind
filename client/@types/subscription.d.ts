export interface ISubscription {
  _id: string;
  plan?: ePlan;
  price: number;
  currency: string;
  discount: number;
  description: string;
  active?: boolean;
}

enum ePlan {
  "MONTHLY",
  "YEARLY",
  "4LIFE",
}
