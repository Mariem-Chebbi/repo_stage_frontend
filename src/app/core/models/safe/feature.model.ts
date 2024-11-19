import { UserStory } from "./userstory.model";

export interface Feature {
    id: string;
    name: string;
    description: string; 
    userStory?: UserStory[];  // Assuming UserStory is another model



}