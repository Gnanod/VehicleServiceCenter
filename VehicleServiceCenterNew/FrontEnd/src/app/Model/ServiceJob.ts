import {Vehicle} from "./Vehicle";
import {ServiceJobDetails} from "./ServiceJobDetails";

export class ServiceJob {


  serviceJobId:string;
  vehicle : Vehicle;
  employeeName: String;
  date : string;
  total : number;
  serviceJobDetails :Array<ServiceJobDetails>

}
