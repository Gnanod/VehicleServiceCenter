import {MakeModel} from "./MakeModel";
import {MakeModelDetail} from "./MakeModelDetail";
import {StockItemDetail} from "./StockItemDetail";

export class Item{

  itemId:number;
  itemName:string;
  quantityOnHand:number;
  quantityOfPrice:number;
  makeModelDetails:Array<MakeModelDetail>;
  stockItemDetails:Array<StockItemDetail>;
  stockLevel :number;


}
