import { Injectable } from '@angular/core';
import {ServiceJob} from "../Model/ServiceJob";

import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const URL = '/ServiceJobController';

@Injectable({
  providedIn: 'root'
})
export class ServicejobService {

  constructor(private http: HttpClient) { }

  addServiceJob(serviceOrder: ServiceJob) {

    return this.http.post<string>(environment.backend_url + URL + '/addServiceJob',serviceOrder);

  }


}
