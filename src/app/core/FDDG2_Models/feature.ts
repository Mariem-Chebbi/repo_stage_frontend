import { Tasks } from "./tasks";
import { subFeature } from "./subFeature";

export interface Feature {
    expanded: boolean;
    id?: string;
    name?: string;
    description?: string;
    progress?: number;
    subFeatures?: Tasks[]; 
    state: State;
    
}
export enum State {
    ToDo = 'ToDo',
    Completed = 'Completed',
   
}