import { Injectable } from '@angular/core';
import {VehicleClass} from "../DTO/VehicleClass";
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "../Model/Vehicle";
import {environment} from "../../environments/environment";

const URL ='/VehicleClassController';
@Injectable({
  providedIn: 'root'
})

export class VehicleClassService {

  public constructor(private http :HttpClient) { }


  addVehicleClass(vehicleClassServiceModel: VehicleClass) {
    return this.http.post<Vehicle>(environment.backend_url + URL + '/addVehicleClass',vehicleClassServiceModel);

  }

  getAllClass(){
    return this.http.get<Array<VehicleClass>>(environment.backend_url + URL + '/getAllClass');
  }
}
