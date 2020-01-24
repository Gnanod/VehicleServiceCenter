import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Vehicle} from "../Model/Vehicle";
import {HttpClient} from "@angular/common/http";

const URL ='/VehicleController';

@Injectable({
  providedIn: 'root'
})
export class VehicleServiceService {

  public constructor(private http :HttpClient) { }

  addVehicle(vehNgModel: Vehicle) {
    return this.http.post<Vehicle>(environment.backend_url + URL + '/AddVehicle',vehNgModel);

  }

  searchVehicleDetails(searchVehicleNumber: string) {

    //console.log('DDD'+environment.backend_url + URL + '/searchByVehicleNumber/'+searchVehicleNumber);
    return this.http.get<Vehicle>(environment.backend_url + URL + '/searchByVehicleNumber/'+searchVehicleNumber);

  }

  UpdateVehicleDetails(updateVehicleDetails: Vehicle) {

    return this.http.post<Vehicle>(environment.backend_url + URL + '/updateVehicleDetails',updateVehicleDetails);

  }

  deleteVehicle(vehicleId: Number) {

    return this.http.delete<number>(environment.backend_url + URL + '/deleteVehicle/'+vehicleId);

  }

  searchVehicleNumbers(serviceJobId: string) {

    return this.http.get<Vehicle>(environment.backend_url + URL + '/searchVehicleNumbers/'+serviceJobId);

  }
}
