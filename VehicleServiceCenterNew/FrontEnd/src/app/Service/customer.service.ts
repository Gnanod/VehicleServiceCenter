import { Injectable } from '@angular/core';
import {Customer} from "../Model/Customer";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const URL ='/CustomerController';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient) { }

    addCustomerDetails(addCustomer: Customer) {

        return this.http.post<Customer>(environment.backend_url + URL + '/addCustomer',addCustomer);
       // return null;
    }
    
    searchByCustomerName(searchCustomerName :string) {
      
        return this.http.get<Customer>(environment.backend_url + URL + '/searchByCustomerName/'+searchCustomerName);
    }

    deleteCustomer(nic: string) {

        return this.http.delete<string>(environment.backend_url + URL + '/deleteCustomer/'+nic);

      

    }

    UpdateCustomerDetails(updateCustomerDetails: Customer) {
      
     
        // return this.http.put<Customer>(environment.backend_url + URL + '/updateCustomer/'+updateCustomerDetails.nic,updateCustomerDetails);
        return this.http.post<Customer>(environment.backend_url + URL + '/updateCustomer',updateCustomerDetails);

    }

    
}
