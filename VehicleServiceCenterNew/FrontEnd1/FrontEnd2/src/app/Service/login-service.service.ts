import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../Model/Employee";
import {environment} from "../../environments/environment";


const URL ='/LoginController';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  public constructor(private http :HttpClient) { }

  loginFucntion(emp: Employee) {

    return this.http.get<String>(environment.backend_url + URL + '/Login/'+emp.nic+'/'+emp.password);

  }
}
