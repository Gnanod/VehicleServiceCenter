import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Services} from "../Model/Services";


const URL = '/ServicesController';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

 public  constructor(private http: HttpClient) { }


  addService(services: Services) {

    return this.http.post<Services>(environment.backend_url + URL + '/addServices', services);

  }

}
