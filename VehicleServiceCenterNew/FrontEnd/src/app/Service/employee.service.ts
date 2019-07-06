import { Injectable } from '@angular/core';
import {Employee} from "../Model/Employee";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const URL = '/EmployeeController';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) { }

  addEmployee(employee: Employee) {

    return this.http.post<Employee>(environment.backend_url + URL + '/addEmployee', employee);

  }
}
