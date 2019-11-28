import { Injectable } from '@angular/core';
import {Make} from "../Model/Make";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CreditPaymentDto} from "../DTO/CreditPaymentDto";

@Injectable({
  providedIn: 'root'
})
export class RuntimDataService {
  public creditPaymentDto: CreditPaymentDto;

  constructor(private http :HttpClient) { }

  sendData(payment :CreditPaymentDto) {

    this.creditPaymentDto = payment;


  }

  getPayementDetails(){


    return this.creditPaymentDto ;
  }
}
