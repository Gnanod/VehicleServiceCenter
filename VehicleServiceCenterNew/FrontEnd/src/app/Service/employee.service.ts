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

  UpdateEmployeeDetails(updateEmployeeDetails: Employee) {


    // return this.http.put<Employee>(environment.backend_url + URL + '/updateEmployee/'+updateEmployeeDetails.nic,updateEmployeeDetails);
    return this.http.post<Employee>(environment.backend_url + URL + '/updateEmployee',updateEmployeeDetails);

  }

  searchEmployeeDetails(searchEmployeeNumber: number) {

    console.log('DDD'+environment.backend_url + URL + '/searchByEmployeeNumber/'+searchEmployeeNumber);
    return this.http.get<Employee>(environment.backend_url + URL + '/searchByEmployeeNumber/'+searchEmployeeNumber);

  }
}
