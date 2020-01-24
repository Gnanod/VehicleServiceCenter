import {JobOrder} from "./JobOrder";
import {Item} from "./Item";


export class JobOrderItemDetails {

  jobOrderServiceDetails:number;
  jobOrder :JobOrder;
   item:Item;
   qty:number;
   price :number;
   make :string;
   model :string;
   lubeJobType :string;

}
