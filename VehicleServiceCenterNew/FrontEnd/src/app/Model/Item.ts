import {MakeModel} from "./MakeModel";
import {MakeModelDetail} from "./MakeModelDetail";
import {StockItemDetail} from "./StockItemDetail";

export class Item{


  itemId:string;
  itemName:string;
  quantityOnHand:number;
  quantityOfPrice:number;
  itemQuantityType:string;
  makeModelDetails:Array<MakeModelDetail>;
  stockItemDetails:Array<StockItemDetail>;
  stockLevel :number;


}
