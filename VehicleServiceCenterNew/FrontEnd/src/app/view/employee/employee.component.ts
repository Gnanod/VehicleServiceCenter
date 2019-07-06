import { Component, OnInit } from '@angular/core';
import {Employee} from "../../Model/Employee";
import {EmployeeService} from "../../Service/employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService) { }

  addEmpDetails(){

    this.employeeService.addEmployee(this.employee).subscribe((result)=>{

      if (result != null){
        alert("Added Successfully");
      }

    })


  }

  ngOnInit() {
  }

}
