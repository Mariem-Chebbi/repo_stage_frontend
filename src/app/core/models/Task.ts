
import { Project } from "./Project";


export class Task {
  id?: string;
  name: string;
  description: string;
  status?: string;
  priority?: string;
  deadline?: Date;
  completionDate?: Date;
  project?: Project; // Add this line

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.status = '';
    this.priority = '';
    this.deadline = new Date();
  }
}