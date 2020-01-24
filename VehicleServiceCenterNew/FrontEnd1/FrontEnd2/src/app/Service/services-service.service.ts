import { Injectable } from '@angular/core';
import {Services} from "../Model/Services";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


const URL = '/ServicesController';

@Injectable({
  providedIn: 'root'
})
export class ServicesServiceService {

  constructor(private http: HttpClient) {}


  addService(services: Services) {

    return this.http.post<Services>(environment.backend_url + URL + '/addServices', services);

  }

  getAllServices(value:string) {

    return this.http.get<Array<Services>>(environment.backend_url + URL + '/getAllServices/'+value);
  }

  getAllServiceDetails() {

    return this.http.get<Array<Services>>(environment.backend_url + URL + '/getAllServiceDetails');
  }

  deleteService(retServiceId: number) {
    return this.http.delete<string>(environment.backend_url + URL + '/deleteService/' + retServiceId);
  }

  // getServicesDesc(insertSelectedService: string) {
  //
  //   return this.http.get<Array<Services>>(environment.backend_url + URL+"/getServiceDesc/"+insertSelectedService);
  //
  //
  // }
  //
  //
  // getServicesVehicleClass(value: string, value2: string) {
  //   return null;
  //
  // }


  getServicebyId(serviceId: number) {
    return this.http.get<Services>(environment.backend_url + URL + '/getServicebyId/' + serviceId);
  }
}
