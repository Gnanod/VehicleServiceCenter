import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Services} from "../Model/Services";


const URL = '/ServicesController';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) {}


  addService(services: Services) {

    return this.http.post<Services>(environment.backend_url + URL + '/addServices', services);

  }

  getAllServices() {

    return this.http.get<Array<Services>>(environment.backend_url + URL + '/getAllServices');
  }

  deleteService(retServiceId: number) {
    return this.http.delete<number>(environment.backend_url + URL + '/deleteService/' + retServiceId);
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
