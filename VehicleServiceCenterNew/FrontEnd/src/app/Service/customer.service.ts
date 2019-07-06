import { Injectable } from '@angular/core';
import {Customer} from "../Model/Customer";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient) { }

    addCustomerDetails(addCustomer: Customer) {

        return this.http.post<Customer>(environment. + URL + '/addCustomer',cust);
       // return null;
    }
}
