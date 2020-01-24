import { Injectable } from '@angular/core';
import {Vehicle} from "../Model/Vehicle";
import {VehicleClass} from "../DTO/VehicleClass";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const URL ='/VehicleClassController';

@Injectable({
  providedIn: 'root'
})
export class VehicleClassServiceService {

  public constructor(private http :HttpClient) { }



  addVehicleClass(vehicleClassServiceModel: VehicleClass) {
    console.log('Success Service Class')
    return this.http.post<Vehicle>(environment.backend_url + URL + '/addVehicleClass',vehicleClassServiceModel);

  }

  addVehicleClasses(vehicleClassServiceModel: VehicleClass) {
    console.log('Success Service Class')
    return this.http.post<Vehicle>(environment.backend_url + URL + '/addVehicleClasses',vehicleClassServiceModel);
  }

  getAllClass(){
    return this.http.get<Array<VehicleClass>>(environment.backend_url + URL + '/getAllClass');
  }

  addVehicleClassesNew(vehicleClassServiceModel: VehicleClass) {
    console.log('New Vehicle Class')
    return this.http.post<Vehicle>(environment.backend_url + URL + '/addVehicleClassesNew',vehicleClassServiceModel);

  }
}
