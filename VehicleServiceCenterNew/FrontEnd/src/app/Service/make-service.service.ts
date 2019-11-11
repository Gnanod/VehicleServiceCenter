import { Injectable } from '@angular/core';
import {Make} from "../Model/Make";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Employee} from "../Model/Employee";



const URL ='/AddMakeController';

@Injectable({
  providedIn: 'root'
})
export class MakeServiceService {

  constructor(private http: HttpClient) { }

  addMakes(makeModel: Make) {

    return this.http.post<string>(environment.backend_url + URL + '/addMakeModel',makeModel);

  }

  findAllMakes() {

    return this.http.get<Array<Make>>(environment.backend_url + URL + '/getAllMakes');


  }
}
