import {Item} from "./Item";
import {Stock} from "./Stock";

export class StockItemDetail {

  stockDetailId: number;
  quantity: number;
  buyingPrice: number;
  item: Item;
  stock: Stock;
}
