import { Component, OnInit } from '@angular/core';
import {Vehicle} from "../../Model/Vehicle";
import {CustomerService} from "../../Service/customer.service";
import {VehicleService} from "../../Service/vehicle.service";
import {Customer} from "../../Model/Customer";

@Component({
  selector: 'app-customer-vehicle-update',
  templateUrl: './customer-vehicle-update.component.html',
  styleUrls: ['./customer-vehicle-update.component.css']
})
export class CustomerVehicleUpdateComponent implements OnInit {

  constructor(private vehicleService :VehicleService,private customerService : CustomerService) { }

  ngOnInit() {
  }


    searchVehicleValuesIf = true;
    searchVehicleDetails : Vehicle = new Vehicle();
    
    updateVehicleDetails : Vehicle = new Vehicle();
    inputFieldCustomer :Customer = new Customer();
    // updateCustomerDetails : Customer = new Customer();
    searchVehicleNumber :string;

    searchVehicleDetailsByNumber(event: any){
        this.vehicleService.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{


            if(result==null){
                this.searchVehicleValuesIf=true;

            }else{
                
                this.searchVehicleValuesIf=false;
                this.searchVehicleDetails=result;
                this.inputFieldCustomer=result.customer;

            }
        });
    }
    
    // searchVehicleDetailsByNumber(){
    //
    //   this.vehicleService.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{
    //
    //
    //       if(result==null){
    //           this.searchVehicleValuesIf=true;
    //
    //       }else{
    //           this.searchVehicleValuesIf=false;
    //           this.searchVehicleDetails=result;
    //           this.inputFieldCustomer=result.customer;
    //
    //       }
    //   });
    // }

    UpdateCustomerDetails(){
      
        this.customerService.UpdateCustomerDetails(this.inputFieldCustomer).subscribe((result)=>{
            
            
            
            if(result!=null){
                
                alert("Cutomer Updated SuccessFully");
                
            }
            
            
        });
    }
    
    UpdateVehicleDetails(){
        
        this.vehicleService.UpdateVehicleDetails(this.searchVehicleDetails).subscribe((result)=>{

            if(result!=null){
                
                alert("Vehicle Updated SuccessFully");
                
            }
            
        });
    }

    deleteVehicle(){
        this.vehicleService.deleteVehicle(this.searchVehicleDetails.vehicleId).subscribe((result)=>{

            if(result==null){

                alert('Vehicle Deleted SuccessFully');

            }else{

                alert('Vehicle Deleted Fail');

            }
        });
    }
}
