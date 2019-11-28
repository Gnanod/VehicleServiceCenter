import { Injectable } from '@angular/core';
import {Make} from "../Model/Make";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CreditPaymentDto} from "../DTO/CreditPaymentDto";

@Injectable({
  providedIn: 'root'
})
export class RuntimDataService {
  public temp: any;

  constructor(private http :HttpClient) { }

  sendData(name :string) {

    this.temp = name;


  }

  getTemp(){
    return this.temp ? this.temp : "no data";
  }
}
