import {Supplier} from "./Supplier";
import {StockItemDetail} from "./StockItemDetail";
import {StockPayment} from "./StockPayment";

export class Stock {

  stockId: number;
  date: string;
  stockPayementDate ;string;
  beforeDiscountTotal: number;
  supplier: Supplier;
  stockItemDetails: Array<StockItemDetail>
  paymentType :string;
  creditBalance :number;
  discount:number;
  finalDiscountedTotal :number;
  stockPayment :Array<StockPayment>;
}
