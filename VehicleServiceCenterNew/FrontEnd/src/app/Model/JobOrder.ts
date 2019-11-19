import {Vehicle} from "./Vehicle";
import {Employee} from "./Employee";
import {JobOrderItemDetails} from "./JobOrderItemDetails";

export class JobOrder{

  serviceId :string;
  vehicle : Vehicle;
  employeeName: String;
  date : string;
  total : number;
  jobOrderServiceDetails :Array<JobOrderItemDetails>
  lubeJobAmount : number;
  detailJobAmount :number;
  paymentType :string;
  paidAmount :number;
  creditBalance :number;
  serviceAmount:number;
  grossAmount :number;

}
