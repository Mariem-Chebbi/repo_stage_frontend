import { Input } from "./Input";
import { Output } from "./Output";
import { Supplier } from "./Supplier";
import { Process } from "./Process";
import { Customer } from "./Customer";

export interface Sipoc {
    id_sipoc:string;
     addDate:Date;
     idproject:string;
     supplier_sipoc: Supplier[];
     input_sipoc:Input[];
     process_sipoc: Process[];
    output_sipoc : Output[];
    customer_sipoc:Customer[];
    

  }