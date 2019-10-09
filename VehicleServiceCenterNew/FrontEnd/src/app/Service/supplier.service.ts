import { Injectable } from '@angular/core';
import {Supplier} from "../Model/Supplier";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const URL = '/SupplierController';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  public constructor(private http: HttpClient) { }

  addSupplier(supplier: Supplier) {

    return this.http.post<Supplier>(environment.backend_url + URL + '/addSupplier', supplier);

  }

  UpdateSupplierDetails(updateSupplierDetails: Supplier) {


    // return this.http.put<Supplier>(environment.backend_url + URL + '/updateSupplier/'+updateSupplierDetails.nic,updateSupplierDetails);
    return this.http.post<Supplier>(environment.backend_url + URL + '/updateSupplier',updateSupplierDetails);

  }


  deleteSupplier(supplierId: number) {

    return this.http.delete<string>(environment.backend_url + URL + '/deleteSupplier/' + supplierId);

  }

  searchSupplierDetails(searchSupplierName: string) {
    return this.http.get<Supplier>(environment.backend_url + URL + '/searchBySupplierName/'+searchSupplierName);
  }


  getAllSupplier(){

    return this.http.get<Array<Supplier>>(environment.backend_url + URL + '/getAllSupplier');

  }

  getSuppliersNames(companyName:string) {

    return this.http.get<Array<Supplier>>(environment.backend_url + URL + '/getSuppliersNames/'+companyName);

  }

  updateSupplier(updateSupplierVar: Supplier) {
    return this.http.post<Supplier>(environment.backend_url + URL + '/updateSupplier',updateSupplierVar);
  }
}
