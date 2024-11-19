import { Pi } from "./pi.model";
import { Sprint } from "./sprint.model";

export interface Art {
    id: string; // Unique identifier for the Agile Release Train
    name: string; // Name of the Agile Release Train
    description: string; // Description of the Agile Release Train
    programIncrements: Pi[]; // List of Program Increments associated with this ART
    sprints: Sprint[]; // List of Sprints associated with this ART
}
