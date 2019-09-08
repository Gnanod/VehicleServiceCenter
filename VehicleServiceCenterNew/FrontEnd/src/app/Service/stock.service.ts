import { Injectable } from '@angular/core';
import {Stock} from "../Model/Stock";
import {HttpClient} from "@angular/common/http";

import {MakeModel} from "../Model/MakeModel";
import {environment} from "../../environments/environment";
import {Supplier} from "../Model/Supplier";
import {LowStockLevelComponent} from "../view/low-stock-level/low-stock-level.component";
import {LowStockLevelDTO} from "../DTO/LowStockLevelDTO";


const URL ='/StockController';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  addStock(stock: Stock) {

    return this.http.post<string>(environment.backend_url + URL + '/addStock',stock);

  }

  lowStock(){

    return this.http.get<Array<LowStockLevelDTO>>(environment.backend_url + URL + '/getLowStockLevelReport/');

  }
}
