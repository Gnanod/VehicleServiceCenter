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
    updateCustomerDetails : Customer = new Customer();
    searchVehicleNumber :string;
    
    searchVehicleDetailsByNumber(){
      console.log('GGGGGGGGG');
      this.vehicleService.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{
       

          if(result==null){
              this.searchVehicleValuesIf=true;

          }else{
              this.searchVehicleValuesIf=false;
              this.searchVehicleDetails=result;
              console.log('GGGGGGGG'+this.searchVehicleDetails.customer.phoneNumber)
          }
      });
    }

    UpdateCustomerDetails(){

        this.customerService.UpdateCustomerDetails(this.updateCustomerDetails).subscribe((result)=>{
            
            if(result!=null){
                alert("Cutomer Updated SuccessFully");
            }
        });
    }
}
