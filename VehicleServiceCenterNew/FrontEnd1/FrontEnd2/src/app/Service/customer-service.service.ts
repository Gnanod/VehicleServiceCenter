import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../Model/Customer";
import {environment} from "../../environments/environment";

const URL ='/CustomerController';
const URL1 ='/CustomerIdController';
@Injectable({
  providedIn: 'root'
})



export class CustomerServiceService {


  public constructor(private http :HttpClient) { }

  addCustomerDetails(addCustomer: Customer) {

    return this.http.post<Customer>(environment.backend_url + URL + '/addCustomer',addCustomer);
    // return null;
  }

  searchByCustomerName(searchCustomerName :string) {

    return this.http.get<Array<Customer>>(environment.backend_url + URL + '/searchByCustomerName/'+searchCustomerName);
  }

  deleteCustomer(nic: string) {

    return this.http.delete<string>(environment.backend_url + URL + '/deleteCustomer/'+nic);



  }

  UpdateCustomerDetails(updateCustomerDetails: Customer) {


    // return this.http.put<Customer>(environment.backend_url + URL + '/updateCustomer/'+updateCustomerDetails.nic,updateCustomerDetails);
    return this.http.post<Customer>(environment.backend_url + URL + '/updateCustomer',updateCustomerDetails);

  }

  getCustomerlLastId() {

    return this.http.get<Customer>(environment.backend_url + URL1 + '/getLastID',);
    // return this.http.post<String>(url, purchaseOrderCustom,
    //   {headers: this.he , responseType:'text'})
    //   .pipe (catchError(this.handleError('postPurchaseOrderCustom', 'I am an error')));
  }


}
