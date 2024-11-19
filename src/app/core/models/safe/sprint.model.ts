import { UserStory } from "./userstory.model";

export interface Sprint {
  id?: string;  // Optional because it might not be present in creation requests
  name?: string;
  goal?: string;
  startDate?: Date;
  endDate?: Date;
  userStory?: UserStory[];  // Assuming UserStory is another model
}