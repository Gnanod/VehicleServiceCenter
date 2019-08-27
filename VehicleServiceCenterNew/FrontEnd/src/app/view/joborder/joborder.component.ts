import { Component, OnInit } from '@angular/core';
import {JobOrder} from "../../Model/JobOrder";
import {JoborderService} from "../../Service/joborder.service";
import {Vehicle} from "../../Model/Vehicle";
import {VehicleService} from "../../Service/vehicle.service";
import {Customer} from "../../Model/Customer";
import {Item} from "../../Model/Item";

@Component({
  selector: 'app-joborder',
  templateUrl: './joborder.component.html',
  styleUrls: ['./joborder.component.css']
})
export class JoborderComponent implements OnInit {

  private joborder: JobOrder = new JobOrder();
  constructor(private joborderservice : JoborderService
  ,private vehicleservice : VehicleService) { }


  searchVehicleDetails : Vehicle = new Vehicle();
  searchVehicleNumber : string;

  vehicleNumber: string;
  engineNumber: string;
  vehicleClass: string;
  vehicleMake: string;
  vehicleModel: string;
  yearOfManufacture:string;
  customer: Customer;
  customername: string;
  customerphone: string;
  customeraddress: string;
  customeremail: string;

  searchVehicleDetailsByNumber(){
    this.vehicleservice.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{
      if (result == null) {
        console.log("HUTTOOOO");
        this.engineNumber = null;
        this.vehicleClass = null;

        this.vehicleMake = null;
        this.vehicleModel = null;
        this.yearOfManufacture = null;
        this.customer = null;

        this.customername= null;
        this.customerphone= null;
        this.customeraddress= null;
        this.customeremail= null;
      }
      else {
        this.searchVehicleDetails = result;

        this.vehicleNumber = this.searchVehicleDetails.vehicleNumber;
        this.engineNumber = this.searchVehicleDetails.engineNumber;
        this.vehicleClass = this.searchVehicleDetails.vehicleClass;

        this.vehicleMake = this.searchVehicleDetails.vehicleMake;
        this.vehicleModel = this.searchVehicleDetails.vehicleModel;
        this.yearOfManufacture = this.searchVehicleDetails.yearOfManufacture;
        this.customer = this.searchVehicleDetails.customer;

        this.customername= this.customer.firstName;
        this.customerphone= this.customer.phoneNumber;
        this.customeraddress= this.customer.address;
        this.customeremail= this.customer.email;


      }
    });
  }



  ngOnInit() {
  }

}
