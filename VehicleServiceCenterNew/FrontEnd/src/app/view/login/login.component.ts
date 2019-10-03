import { Component, OnInit } from '@angular/core';
import {Employee} from "../../Model/Employee";
import {LoginService} from "../../Service/login.service";
import {Router} from "@angular/router";

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
          console.log("error"+result)
            
          if(this.error=="1"){
            this.router.navigate(['/main/dashboard']);
          }

          if(this.error=="2"){
            this.router.navigate(['/jobOrder']);
          }

          if(this.error=="3"){

            alert("Login UnSuccess .Please Input Valid Login Details");
          }

          
        });
        
    }
  
}
