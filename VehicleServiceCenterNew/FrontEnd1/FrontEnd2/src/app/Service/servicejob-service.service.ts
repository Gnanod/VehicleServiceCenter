import { Injectable } from '@angular/core';
import {ServiceJob} from "../Model/ServiceJob";
import {environment} from "../../environments/environment";
import {ServicesDTO} from "../DTO/ServicesDTO";
import {DocumentDto} from "../DTO/DocumentDto";
import {HttpClient} from "@angular/common/http";

const URL = '/ServiceJobController';
const URL1 = '/ServiceIdController'

@Injectable({
  providedIn: 'root'
})
export class ServicejobServiceService {

  constructor(private http: HttpClient) { }

  addServiceJob(serviceOrder: ServiceJob) {

    return this.http.post<string>(environment.backend_url + URL + '/addServiceJob',serviceOrder);

  }


  getServiceDetailLastId() {

    return this.http.get<ServiceJob>(environment.backend_url + URL1 + '/getLastID',);
    // return this.http.post<String>(url, purchaseOrderCustom,
    //   {headers: this.he , responseType:'text'})
    //   .pipe (catchError(this.handleError('postPurchaseOrderCustom', 'I am an error')));
  }

  searchServiceDetails() {

    return this.http.get<ServiceJob>(environment.backend_url + URL1 + '/getLastID',);

  }

  addServiceJobs(serviceOrder: ServicesDTO) {

    return this.http.post<DocumentDto>(environment.backend_url + URL + '/addServiceJob',serviceOrder);


  }
}
