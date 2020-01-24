import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {JobOrder} from "../Model/JobOrder";
import {VehicleCustomerDTO} from "../DTO/VehicleCustomerDTO";
import {DocumentDto} from "../DTO/DocumentDto";
import {JobOrderDTO} from "../DTO/JoOrderDTO";
import {ServicesDTO} from "../DTO/ServicesDTO";
import {HttpClient} from "@angular/common/http";
import {Item} from "../Model/Item";

const URL = '/JobOrderController';
@Injectable({
  providedIn: 'root'
})
export class JoborderServiceService {

  public constructor(private http: HttpClient) { }

  searchItem(searchItem: string, insertItemModel: string, insertselectedMake: string) {

    return this.http.get<Array<Item>>(environment.backend_url + URL + '/getItemsForJobOrder/'+searchItem+'/'+insertselectedMake +'/'+insertItemModel);

  }


  searchUnitPrice(value: string) {

    return this.http.get<Item>(environment.backend_url + URL + '/searchUnitPrice/'+value);


  }

  getTotalSales() {

    return this.http.get<number>(environment.backend_url + URL + '/getTotalSales');


  }


  getTodayJobCount() {

    return this.http.get<number>(environment.backend_url + URL + '/getTodayJobCount');


  }

  getMonthlyTotalSales() {
    return this.http.get<number>(environment.backend_url + URL + '/getMonthlyTotalSales');
  }
  // addJobOrder(jobOrder: JobOrder, jobOrderItemDetailsArray: Array<JobOrderItemDetails>, lubejobOrderItemDetailsArray1: Array<JobOrderItemDetails>) {
  //
  //   // return this.http.post<string>(environment.backend_url + URL + '/addJobOrder/'+jobOrder);
  //
  // //  +'/'+jobOrderItemDetailsArray+'/'+lubejobOrderItemDetailsArray1
  // }
  addJobOrder(jobOrderDto: JobOrderDTO) {

    return this.http.post<DocumentDto>(environment.backend_url + URL + '/addJobOrder',jobOrderDto);

  }


  searchServiceDetails(serviceJobOrderId: string) {

    return this.http.get<VehicleCustomerDTO>(environment.backend_url + URL+'/getDetailsAccordingToServiceId/'+serviceJobOrderId);

  }

  serchPreviousJobs(vehicleId: string) {

    return this.http.get<JobOrder>(environment.backend_url + URL+'/serchPreviousJobs/'+vehicleId);

  }

  printJobOrders(sendServiceDetail:ServicesDTO) {

    return this.http.post<DocumentDto>(environment.backend_url + URL+'/downloadJobOrder/',sendServiceDetail);
  }
}
