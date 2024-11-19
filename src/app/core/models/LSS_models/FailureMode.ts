import { ActionItem } from "./ActionItem";


export interface FailureMode {
    id:string;
    title:string;
    severity:number;
    occurrence:number;
    detection:number;
    rpn:number;
    description:string;
    projectCharterId:string;
    createdDate:Date;
    updatedDate:Date;

    actionItems:ActionItem[];



  }