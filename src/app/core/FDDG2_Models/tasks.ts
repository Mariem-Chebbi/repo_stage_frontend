import { User } from "./user";

export interface Tasks {
    taskId?: string;
    taskName?: string; // Changed to lowercase string
    description?: string; // Changed to lowercase string
    deadline?: string;
    createdAt?: string;
    status?: any;
    assignemntUrl?: string; // Fixed spelling from 'assignemntUrl'
    assignemnt?: string; // Fixed spelling from 'assignemnt'
    progress?: number;
    featureId?: string;
    userId?: string;
    user?: User;
    responsivity?:number;
    ergonomics?:number;
    deadlineC?:number;
    descriptionC?:number;
    techUse?:number;

}
