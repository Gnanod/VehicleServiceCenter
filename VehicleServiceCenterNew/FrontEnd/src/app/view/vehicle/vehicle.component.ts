import { Component, OnInit } from '@angular/core';
import {Customer} from "../../Model/Customer";
import {Vehicle} from "../../Model/Vehicle";
import {CustomerService} from "../../Service/customer.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  cust :Customer = new Customer();
  vehNgModel :Vehicle = new Vehicle();
  addCustomer : Customer = new Customer();
  
  constructor(private customerService :CustomerService) { }

  ngOnInit() {
  }

    addCustomerDetails(){
    
      this.customerService.addCustomerDetails(this.addCustomer).subscribe((result)=>{
        
        if(result!=null){
          
          alert('Customer Added SuccessFully');
          
        }
      });
    }

}
