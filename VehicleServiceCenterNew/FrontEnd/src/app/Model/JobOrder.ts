import {Vehicle} from "./Vehicle";
import {Employee} from "./Employee";
import {JobOrderItemDetails} from "./JobOrderItemDetails";

export class JobOrder{

  vehicle : Vehicle;
  employeeName: String;
  date : string;
  total : number;
  jobOrderServiceDetails :Array<JobOrderItemDetails>

}
