import { Injectable } from '@angular/core';
import {CreditPaymentDto} from "../DTO/CreditPaymentDto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RuntimDataServiceService {

  public creditPaymentDto: CreditPaymentDto;

  constructor(private http :HttpClient) { }

  sendData(payment :CreditPaymentDto) {

    this.creditPaymentDto = payment;


  }

  getPayementDetails(){


    return this.creditPaymentDto ;
  }
}
