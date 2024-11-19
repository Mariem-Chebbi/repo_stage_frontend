export enum TaskStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  IN_TEST = "IN_TEST",
  TO_IMPROVE = "TO_IMPROVE",
  TO_REDO = "TO_REDO",
  // Add other statuses as needed
}
  export interface Backlog {
    // Define the properties of the Backlog model if needed
    // For example:
    // _id: string;
    // name: string;
  }
  
  export interface Task {
    _id: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
    startDate?: Date;
    endDate?: Date;
    assignee?: string;
    backlog?: Backlog;
    sprintId?: string;
  }
  
  