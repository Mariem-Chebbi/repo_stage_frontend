import { Card } from "./Card";

export interface KanbanBoard {
    idkanban:string;
     creation_date:Date;
     id_project:string;
     title_kanban:string;
     cards:Card[];
    

  }