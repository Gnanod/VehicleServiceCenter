import { Injectable } from '@angular/core';
import {Employee} from "../Model/Employee";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Login} from "../Model/Login";


const URL = '/EmployeeController';

const URL1 = '/LoginController'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  public constructor(private http: HttpClient) { }

  addEmployee(employee: Employee) {

    return this.http.post<Employee>(environment.backend_url + URL + '/addEmployee', employee);

  }

  UpdateEmployeeDetails(updateEmployeeDetails: Employee) {


    // return this.http.put<Employee>(environment.backend_url + URL + '/updateEmployee/'+updateEmployeeDetails.nic,updateEmployeeDetails);
    return this.http.post<Employee>(environment.backend_url + URL + '/updateEmployee',updateEmployeeDetails);

  }


  deleteEmployee(employeeId: number) {

    return this.http.delete<string>(environment.backend_url + URL + '/deleteEmployee/' + employeeId);


  }

  searchEmployeeDetails(searchEmployeeNumber: string) {

    return this.http.get<Array<Employee>>(environment.backend_url + URL + '/searchByEmployeeNumber/'+searchEmployeeNumber);
  }

  LoginDetail(loginDet: Login) {

    return this.http.post<Login>(environment.backend_url + URL1 + '/addLogin/',loginDet);


  }
}
