import { Injectable } from '@angular/core';
import {Item} from "../Model/Item";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ViewItemStockDTO} from "../DTO/ViewItemStockDTO";

const URL = '/ItemController';
@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  public constructor(private http: HttpClient) { }

  addItemsToDB(item: Item) {
    console.log('hhhhh'+item.makeModelDetails[0].makeModel);
    return this.http.post<Item>(environment.backend_url + URL+"/addItemDB",item);

  }

  searchItemDetailsByName(searchItemName: string) {

    return this.http.get<Item>(environment.backend_url + URL+"/getItemDetailsByName/"+searchItemName);

  }

  // searchItem(searchItem: string, insertItemModel: string, insertselectedMake: string) {
  //
  //   return this.http.get<Item>(environment.backend_url + URL+"/getItemDetailsByName/"+searchItemName);
  //
  //
  // }

  getItemDetailsByName(searchStockItemName: string) {

    return this.http.get<Array<Item>>(environment.backend_url + URL+"/getItemDetailsByNameToArray/"+searchStockItemName);

  }

  getAllItems(){
    return this.http.get<Array<ViewItemStockDTO>>(environment.backend_url + URL+"/getAllItems");

  }
}
