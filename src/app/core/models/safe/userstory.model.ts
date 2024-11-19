import { Task,TaskStatus } from "./task.model";

export interface UserStory {
    id?: string;
    sprintId?: string; // Assuming this is a string ID
    title?: string;
    description?: string;
    priority?: string;
    status?: TaskStatus;
    tasks?: Task[];
  }
  
