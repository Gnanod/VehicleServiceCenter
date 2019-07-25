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

  constructor(private loginService :LoginService,private router:Router) { }

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
            
            
          if(result!=null){

             
              this.router.navigate(['/main/dashboard']);
              
          }else{

              alert("Login UnSuccess");
              
          }
          
        });
        
    }
  
}
