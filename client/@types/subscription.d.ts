export interface ISubscription {
  plan: ePlan;
  active: boolean;
}

enum ePlan {
  "MONTHLY",
  "YEARLY",
  "4LIFE",
}
