import { Feedback } from './Feedback';
import { Task } from './Task';

export class Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: string;
  status: string;
  tasks?: Task[];
  feedbacks?: Feedback[];

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.priority = '';
    this.status = '';
  }
}