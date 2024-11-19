import { User } from "./user";

export interface subFeature {
  id?: string;
  name: string;
  description: string;
  progress?: number;
  featureId?: string;
  userId?: string;
  user?: User;      // Optional full user object for easier access if needed
}
