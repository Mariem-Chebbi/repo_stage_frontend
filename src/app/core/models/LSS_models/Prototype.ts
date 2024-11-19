import { Feedback } from "./Feedback";
import { PrototypeImg } from "./PrototypeImg";

export interface Prototype {
    id:string;
    description:string;
    name:string;
    idproject:string;
    date_creation:Date;
    last_modif:Date;
    images_prot:PrototypeImg[];
    feedbacks:Feedback[];

    
}