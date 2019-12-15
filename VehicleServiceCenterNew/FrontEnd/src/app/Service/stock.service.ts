import { Injectable } from '@angular/core';
import {Stock} from "../Model/Stock";
import {HttpClient} from "@angular/common/http";

import {MakeModel} from "../Model/MakeModel";
import {environment} from "../../environments/environment";
import {Supplier} from "../Model/Supplier";
import {LowStockLevelComponent} from "../view/low-stock-level/low-stock-level.component";
import {LowStockLevelDTO} from "../DTO/LowStockLevelDTO";
import {CreditPaymentDto} from "../DTO/CreditPaymentDto";
import {CustomerPaymentViewDto} from "../DTO/CustomerPaymentViewDto";
import {MonthlyOutComeReport} from "../DTO/MonthlyOutComeReport";


const URL ='/StockController';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public constructor(private http: HttpClient) { }

  addStock(stock: Stock) {

    return this.http.post<string>(environment.backend_url + URL + '/addStock',stock);

  }

  lowStock(){

    return this.http.get<Array<LowStockLevelDTO>>(environment.backend_url + URL + '/getLowStockLevelReport/');

  }

  getCreditPaymentDetails(){

    return this.http.get<Array<CreditPaymentDto>>(environment.backend_url + URL + '/getCreditPaymentDetails');

  }



  updateStockPayments(creditPaymentDto: CreditPaymentDto) {

    return this.http.post<String>(environment.backend_url + URL + '/updateStockPayments',creditPaymentDto);

  }

  getCustomerPaymentDetails() {

    return this.http.get<Array<CustomerPaymentViewDto>>(environment.backend_url + URL + '/getCustomerPaymentDetails');

  }

  gettotalOutComeForToday() {
    return this.http.get<number>(environment.backend_url + URL + '/getTodayTotalOutCome');

  }

  getMonthlyOutComeForMonth() {
    return this.http.get<number>(environment.backend_url + URL + '/getMonthlyTotalOutCome');

  }
  getMonthlyOutCome(){
    return this.http.get<Array<MonthlyOutComeReport>>(environment.backend_url + URL + '/getMonthlyOutCome');
  }
}

