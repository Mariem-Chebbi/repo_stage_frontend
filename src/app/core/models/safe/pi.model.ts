import { Sprint } from "./sprint.model";

export interface Pi {

    id?: string; // Unique identifier for the Program Increment
  name: string; // Name of the Program Increment (e.g., Q1 2024)
  startDate: Date; // Start date of the Program Increment
  endDate: Date; // End date of the Program Increment
  objectives: string; // Objectives for the Program Increment
  sprints: Sprint[]; // List of Sprints within this Program Increment
}
