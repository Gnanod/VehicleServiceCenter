import {Component, OnInit} from '@angular/core';
import {Employee} from "../../Model/Employee";
import {EmployeeService} from "../../Service/employee.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Login} from "../../Model/Login";
import Swal from "sweetalert2";


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

  employeeId:string;
  firstName:string;
  lastName :string;
  email:string;
  nic:string;
  address:string;
  birthday:string;
  phoneNumber:string;

  updateEmployee :Employee = new Employee();





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

  public employee: Employee = new Employee();


  public constructor(public employeeService: EmployeeService) {}



    //Employee search to be edited

    searchEmployeeValuesIf = true;
    searchEmployeeDetails: Array<Employee> = new Array<Employee>();
    updateEmployeeDetails: Employee = new Employee();
    searchEmployeeNumber: string;

    UpdateEmployeeDetails()
    {
      this.employeeService.UpdateEmployeeDetails(this.updateEmployee).subscribe((result) => {

        if (result != null) {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Employee Updated SuccessFully',
            showConfirmButton: false,
            timer: 1500
          })
          this.updateEmployee = new Employee();

        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Employee Updated Fail',
            showConfirmButton: false,
            timer: 1500
          })
        }

      });
    }

    searchEmployeeDetailsByNumber()
    {
      console.log("GGGGGGGGG"+this.searchEmployeeNumber);
      if(this.searchEmployeeNumber.length!=0){
        this.employeeService.searchEmployeeDetails(this.searchEmployeeNumber).subscribe((result) => {

          console.log(result)
          if (result.length == 0) {
            this.searchEmployeeValuesIf = true;

          } else {
            this.searchEmployeeValuesIf = false;
            this.searchEmployeeDetails = result;
          }
        });
      }

    }

    //ends here

    validFirstNameIf = false;
    validLastNameIf = false;
    // validemailIf = false;
    valideNicIf = false;
    validAddressIf = false;
    validBirthdayIf = false;
    validPhoneNumberIf = false;

    validPhoneNumberLength = false;

    addEmpDetails()
    {

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

      // if (this.employee.email == null) {
      //
      //   this.validemailIf = true;
      //
      // } else {
      //
      //   this.validemailIf = false;
      //
      // }

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

      if (this.validFirstNameIf == false && this.validLastNameIf == false && this.valideNicIf == false && this.validAddressIf == false && this.validBirthdayIf == false && this.validPhoneNumberIf == false) {
        this.employeeService.addEmployee(this.employee).subscribe((result) => {

          if (result != null) {
            // alert("Added Successfully");
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Added Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            this.employee = new Employee();
          }else{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Added Fail',
              showConfirmButton: false,
              timer: 1500
            })
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


    validEmployee()
    {

      if (this.employee.firstName == null || this.employee.firstName.length == 0) {

        this.validFirstNameIf = true;

      } else {

        this.validFirstNameIf = false;

      }
    }

    validEmployee1()
    {

      if (this.employee.lastName == null || this.employee.lastName.length == 0) {

        this.validLastNameIf = true;

      } else {

        this.validLastNameIf = false;

      }

    }

    // validEmployee2()
    // {
    //
    //   if (this.employee.email == null || this.employee.email.length == 0) {
    //
    //     this.validemailIf = true;
    //
    //   } else {
    //
    //     this.validemailIf = false;
    //
    //   }
    //
    // }

    validEmployee3()
    {

      if (this.employee.nic == null || this.employee.nic.length == 0) {

        this.valideNicIf = true;

      } else {

        this.valideNicIf = false;

      }

    }

    validateEmploye4()
    {

      if (this.employee.address == null || this.employee.address.length == 0) {

        this.validAddressIf = true;

      } else {

        this.validAddressIf = false;

      }

    }

    validateEmploye5()
    {

      if (this.employee.birthday == null || this.employee.birthday.length == 0) {

        this.validBirthdayIf = true;

      } else {

        this.validBirthdayIf = false;

      }

    }

    validateEmployee6()
    {
      if (this.employee.phoneNumber == null || this.employee.phoneNumber.length == 0) {

        this.validPhoneNumberIf = true;

      //  this.searchEmployeeDetails = new Employee();
        // if(this.employee.phoneNumber.length!=10){
        //   this.validPhoneNumberLength = true;
        // }

      } else {

        this.validPhoneNumberIf = false;
        // this.validPhoneNumberLength = false;
      }
    }

    deleteEmployee(empId:any)
    {

      if (confirm("Do you really want to Delete......!")) {
        this.employeeService.deleteEmployee(empId).subscribe((result) => {

          if (result == null) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Employee Deleted SuccessFully',
              showConfirmButton: false,
              timer: 1500
            })
            this.searchEmployeeValuesIf = true;
            this.searchEmployeeDetails = new Array<Employee>();
          } else {

            // alert('Employee Deleted Fail');
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Employee Deleted Fail',
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
      } else {

      }



    }

    ngOnInit()
    {
    }


    ///////////////

    loginUserName :string;
    loginPassword:string;
    confirmPassword:string;
    type :string;


    validPasswordIf = false;

    //////////////////////


    addLoginDetails()
    {

      console.log("Login" + this.loginPassword)


      if (this.loginPassword == this.confirmPassword) {

        this.validPasswordIf = false;

        let loginDet: Login = new Login();

        loginDet.password = this.confirmPassword;
        loginDet.userName = this.loginUserName;
        loginDet.type = this.type;

        console.log("Login" + this.confirmPassword)
        console.log("Login" + this.loginUserName)
        console.log("Login" + this.type)

        this.employeeService.LoginDetail(loginDet).subscribe((result) => {

          if (result != null) {
            alert("Added Successfully");
            // this.employee = new Employee();
            this.confirmPassword = null;
            this.loginUserName = null;
            this.loginPassword = null;
          }

        })

      } else {

        this.validPasswordIf = true;

      }

    }


  editEmployee(employee: Employee) {
 this.updateEmployee = employee;
  }
}
