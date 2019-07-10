import { Component, OnInit } from '@angular/core';
import {Customer} from "../../Model/Customer";
import {Vehicle} from "../../Model/Vehicle";
import {CustomerService} from "../../Service/customer.service";
import {FormControl} from "@angular/forms";
import {VehicleService} from "../../Service/vehicle.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  cust :Customer = new Customer();
  vehNgModel :Vehicle = new Vehicle();
  addCustomer : Customer = new Customer();
  selectVehicleClass:FormControl = new FormControl();
  getCustomerNic  :string;
  stringDateModel: string = new Date().toString();
  searchCustomerName :string ;
  searchCustomerValuesIf = true;
  searchCustomerDetails : Customer = new Customer();
  
  constructor(private customerService :CustomerService,private vehicleService :VehicleService) {
      this.selectVehicleClass.setValue('A');
  }

  ngOnInit() {
    
  }

    addCustomerDetails(){
    
      this.customerService.addCustomerDetails(this.addCustomer).subscribe((result)=>{
        
        if(result!=null){
          
          alert('Customer Added SuccessFully');
          
        }
      });
    }

    addVehicleDetails(){

    this.vehNgModel.customer=this.cust;
    this.vehNgModel.yearOfManufacture=this.stringDateModel.toString();
    
    this.vehicleService.addVehicle(this.vehNgModel).subscribe((result)=>{
        if(result!=null){
           alert('Vehicle Added SuccessFully');
        }
    })
    
    // console.log(this.cust.nic);
    // console.log(this.selectVehicleClass.value);
    // console.log(this.stringDateModel.toString());
    }
    
    


    searchByCustomerName(){
  
    this.customerService.searchByCustomerName(this.searchCustomerName).subscribe((result)=>{

        if(result==null){
            this.searchCustomerValuesIf=true;
            
        }else{
            this.searchCustomerValuesIf=false;
            this.searchCustomerDetails = result;
        }
      
    });
    }

    deleteCustomer(){
        this.customerService.deleteCustomer(this.searchCustomerDetails.nic).subscribe((result)=>{
          
          if(result==null){
            
            alert('Customer Deleted SuccessFully');
            
          }else{
            
            alert('Customer Deleted Fail');
            
          }
        });
    }
    
    

}
