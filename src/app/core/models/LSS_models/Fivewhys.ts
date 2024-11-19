import { Solution } from "./Solution";
import { Whys } from "./Whys";

export interface Fivewhys {
    id_fivewhys:string;
    idproject:string;
    problem_statement:string;
    root_cause_fivewhys:string;
    categorieProblem:string;

    whys:Whys[];
    solution_fivewhys: Solution[];



  }