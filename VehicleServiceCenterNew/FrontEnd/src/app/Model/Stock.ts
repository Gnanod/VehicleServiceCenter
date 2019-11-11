import {Supplier} from "./Supplier";
import {StockItemDetail} from "./StockItemDetail";

export class Stock {

  stockId: number;
  date: string;
  stockPayementDate ;string;
  payment: number;
  supplier: Supplier;
  stockItemDetails: Array<StockItemDetail>
  paymentType :string;
  creditBalance :number;

}
