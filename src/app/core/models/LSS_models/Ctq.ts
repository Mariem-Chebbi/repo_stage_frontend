import { Score } from "./Score";

export interface Ctq {
    id:string;
    description:string;
    met?: boolean;
    csat?: number;
    score:Score[];


    
  }