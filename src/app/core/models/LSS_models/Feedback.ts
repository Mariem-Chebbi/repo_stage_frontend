import { User } from "./User";

export interface Feedback {

    id:string;
    content:string;
    date_add:Date;
    user: User | string; 
    las_modified:Date;
    
}