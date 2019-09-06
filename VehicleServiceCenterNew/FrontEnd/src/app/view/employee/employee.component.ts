import {Component, OnInit} from '@angular/core';
import {Employee} from "../../Model/Employee";
import {EmployeeService} from "../../Service/employee.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // form = new FormGroup({
  //   empName: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   phoneNumber: new FormControl('', Validators.required),
  //   compnayName: new FormControl('', Validators.required),
  //   address: new FormControl('', Validators.required),
  //
  //
  // });

  form1 = new FormGroup({

    empId1:new FormControl('',Validators.required),
    empName1: new FormControl('', Validators.required),
    nic1: new FormControl('', Validators.required),
    lastName1: new FormControl('', Validators.required),
    email1: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber1: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    // compnayName1:new FormControl('',Validators.required),
    address1: new FormControl('', Validators.required),
    birthday1: new FormControl('', Validators.required),


  });

  private employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService) {
  }


  //Employee search to be edited

  searchEmployeeValuesIf = true;
  searchEmployeeDetails: Employee = new Employee();
  updateEmployeeDetails: Employee = new Employee();
  searchEmployeeNumber: string;

  UpdateEmployeeDetails() {
    this.employeeService.UpdateEmployeeDetails(this.searchEmployeeDetails).subscribe((result) => {

      if (result != null) {

        alert("Employee Updated SuccessFully");

      }

    });
  }

  searchEmployeeDetailsByNumber() {
    this.employeeService.searchEmployeeDetails(this.searchEmployeeNumber).subscribe((result) => {


      if (result == null) {
        this.searchEmployeeValuesIf = true;

      } else {
        this.searchEmployeeValuesIf = false;
        this.searchEmployeeDetails = result;
      }
    });
  }

  //ends here

  validFirstNameIf = false;
  validLastNameIf = false;
  validemailIf = false;
  valideNicIf = false;
  validAddressIf = false;
  validBirthdayIf = false;
  validPhoneNumberIf = false;

  validPhoneNumberLength = false;

  addEmpDetails() {

    if (this.employee.firstName == null) {

      this.validFirstNameIf = true;

    } else {

      this.validFirstNameIf = false;

    }

    if (this.employee.lastName == null) {

      this.validLastNameIf = true;

    } else {

      this.validLastNameIf = false;

    }

    if (this.employee.email == null) {

      this.validemailIf = true;

    } else {

      this.validemailIf = false;

    }

    if (this.employee.nic == null) {

      this.valideNicIf = true;

    } else {

      this.valideNicIf = false;

    }

    if (this.employee.address == null) {

      this.validAddressIf = true;

    } else {

      this.validAddressIf = false;

    }

    if (this.employee.birthday == null) {

      this.validBirthdayIf = true;

    } else {

      this.validBirthdayIf = false;

    }

    if (this.employee.phoneNumber == null) {

      this.validPhoneNumberIf = true;

    } else {

      this.validPhoneNumberIf = false;

    }

    if (this.validFirstNameIf == false && this.validLastNameIf == false && this.validemailIf == false && this.valideNicIf == false && this.validAddressIf == false && this.validBirthdayIf == false && this.validPhoneNumberIf == false) {
      this.employeeService.addEmployee(this.employee).subscribe((result) => {

        if (result != null) {
          alert("Added Successfully");
          this.employee = new Employee();
        }

      })
    }
    // this.employeeService.addEmployee(this.employee).subscribe((result)=>{
    //
    //   if (result != null){
    //     alert("Added Successfully");
    //     this.employee = new Employee();
    //   }
    //
    // })


  }


  validEmployee() {

    if (this.employee.firstName == null || this.employee.firstName.length == 0) {

      this.validFirstNameIf = true;

    } else {

      this.validFirstNameIf = false;

    }
  }

  validEmployee1() {

    if (this.employee.lastName == null || this.employee.lastName.length == 0) {

      this.validLastNameIf = true;

    } else {

      this.validLastNameIf = false;

    }

  }

  validEmployee2() {

    if (this.employee.email == null || this.employee.email.length == 0) {

      this.validemailIf = true;

    } else {

      this.validemailIf = false;

    }

  }

  validEmployee3() {

    if (this.employee.nic == null || this.employee.nic.length == 0) {

      this.valideNicIf = true;

    } else {

      this.valideNicIf = false;

    }

  }

  validateEmploye4() {

    if (this.employee.address == null || this.employee.address.length == 0) {

      this.validAddressIf = true;

    } else {

      this.validAddressIf = false;

    }

  }

  validateEmploye5() {

    if (this.employee.birthday == null || this.employee.birthday.length == 0) {

      this.validBirthdayIf = true;

    } else {

      this.validBirthdayIf = false;

    }

  }

  validateEmployee6() {
    if (this.employee.phoneNumber == null || this.employee.phoneNumber.length == 0) {

      this.validPhoneNumberIf = true;

      this.searchEmployeeDetails = new Employee();
      // if(this.employee.phoneNumber.length!=10){
      //   this.validPhoneNumberLength = true;
      // }

    } else {

      this.validPhoneNumberIf = false;
      // this.validPhoneNumberLength = false;
    }
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.searchEmployeeDetails.employeeId).subscribe((result) => {

      if (result == null) {

        alert('Employee Deleted SuccessFully');

      } else {

        alert('Employee Deleted Fail');

      }
    });
  }

  ngOnInit() {
  }

}
