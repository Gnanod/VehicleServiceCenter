import { Component, OnInit } from '@angular/core';
import {Employee} from "../../Model/Employee";
import {LoginService} from "../../Service/login.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public constructor(private loginService :LoginService,private router:Router) { }

  ngOnInit() {
    
  }
  empNic:string;
  empPassword :string;
  error :String;
  emp : Employee = new Employee();

    LoginFunction(){
      
        
        this.emp.nic=this.empNic;
        this.emp.password=this.empPassword;
        
        this.loginService.loginFucntion(this.emp).subscribe((result)=>{
          
          this.error =result;
         // console.log("error"+result)
            
          if(this.error=="1"){
            localStorage.setItem("Admin",'admin');
            this.router.navigate(['/main/dashboard']);
           //
            //console.log("GGGGGG"+localStorage.getItem("Admin"))
          }

          if(this.error=="2"){
            localStorage.setItem("Cashier",'cashier');
            this.router.navigate(['/main/supplier']);
            console.log("KKKKKKKKK");

          }

          if(this.error=="3"){
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Login UnSuccess .Please Input Valid Login Details.',
              showConfirmButton: false,
              timer: 1500
            })

          }

          
        });
        
    }
  
}
