import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Make} from "../Model/Make";
import {environment} from "../../environments/environment";

const URL ='/AddMakeController';

@Injectable({
  providedIn: 'root'
})
export class MakeServiceServiceService {

  constructor(private http: HttpClient) { }

  addMakes(makeModel: Make) {

    return this.http.post<string>(environment.backend_url + URL + '/addMakeModel',makeModel);

  }

  findAllMakes() {

    return this.http.get<Array<Make>>(environment.backend_url + URL + '/getAllMakes');


  }
}
