import { FailureMode } from "./FailureMode";

export interface Fmea {
    id:string;
    title:string;
    description:string;
    projectCharterId:string;
    createdDate:Date;
    updatedDate:Date;

    failure_modes:FailureMode[];

  }