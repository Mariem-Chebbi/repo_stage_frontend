import { KanbanBoard } from "./KanbanBoard";

export interface Card {
    id_card:string;
    title_card:string;
    desciption_card:string;
    creation_card:Date;
    priority_card:string;
    status:string;
  }