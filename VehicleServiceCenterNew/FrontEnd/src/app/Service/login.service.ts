import { Injectable } from '@angular/core';
import {Employee} from "../Model/Employee";
import {Vehicle} from "../Model/Vehicle";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


const URL ='/LoginController';
@Injectable({
  providedIn: 'root'
})


export class LoginService {

  public constructor(private http :HttpClient) { }

    loginFucntion(emp: Employee) {
    
        return this.http.get<String>(environment.backend_url + URL + '/Login/'+emp.nic+'/'+emp.password);

    }
}
