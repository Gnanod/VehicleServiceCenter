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


  //Employee search to be edited

  searchEmployeeValuesIf = true;
  searchEmployeeDetails : Employee = new Employee();
  updateEmployeeDetails : Employee = new Employee();
  searchEmployeeNumber : number;

  searchEmployeeDetailsByNumber(){
    this.employeeService.searchEmployeeDetails(this.searchEmployeeNumber).subscribe((result)=>{


      if(result==null){
        this.searchEmployeeValuesIf=true;

      }else{
        this.searchEmployeeValuesIf=false;
        this.searchEmployeeDetails=result;
      }
    });
  }

  //ends here

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
