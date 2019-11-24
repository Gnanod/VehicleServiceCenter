import { Component, OnInit } from '@angular/core';
import {Customer} from "../../Model/Customer";
import {Vehicle} from "../../Model/Vehicle";
import {VehicleService} from "../../Service/vehicle.service";
import {JoborderService} from "../../Service/joborder.service";
import {ServicejobService} from "../../Service/servicejob.service";
import {ServiceJob} from "../../Model/ServiceJob";
import {ServicesDTO} from "../../DTO/ServicesDTO";
import {ServiceInvoiceDTO} from "../../DTO/ServiceInvoiceDTO";

@Component({
  selector: 'app-print-job-card',
  templateUrl: './print-job-card.component.html',
  styleUrls: ['./print-job-card.component.css']
})
export class PrintJobCardComponent implements OnInit {

  constructor(private vehicleservice : VehicleService,private jobService :JoborderService,private serviceJobService: ServicejobService) { }

  ngOnInit() {
    this.getServiceDetailLastId();
  }

  vehicleId : Number;
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
  searchVehicleDetails : Vehicle = new Vehicle();
  searchVehicleNumber : string;

  lastId :ServiceJob = new ServiceJob();
  stringLastId :string;
  serviceInvoice : ServiceInvoiceDTO = new ServiceInvoiceDTO();

  searchVehDetailsByNumber() {


    this.vehicleservice.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{
      if (result == null) {

        this.vehicleId = null;
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
        this.vehicleId = this.searchVehicleDetails.vehicleId;
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



  serviceOrder : ServiceJob = new ServiceJob();

  printJobOrder(){

    this.serviceInvoice.chasisNumber= this.engineNumber;
    this.serviceInvoice.make = this.vehicleMake;
    this.serviceInvoice.model = this.vehicleModel;
    this.serviceInvoice.vehicleNumber= this.searchVehicleNumber;
    this.serviceInvoice.year  = this.yearOfManufacture;
    this.serviceInvoice.customerName = this.customername;
    this.serviceInvoice.customerAddress = this.customeraddress;
    this.serviceInvoice.customerPhoneNumber = this.customerphone;

    let sendServiceDetail : ServicesDTO = new ServicesDTO();

    this.serviceOrder.serviceJobId= this.lastId.serviceJobId;
    sendServiceDetail.serviceInvoice = this.serviceInvoice;

    this.jobService.printJobOrders(sendServiceDetail).subscribe((result)=>{

      if(result!=null){
        alert('Job Order Print Successfully');
        this.vehicleId = null;
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
      }else{
        alert('Cant Print JobOrder')

      }
    });
  }

  getServiceDetailLastId(){

    this.serviceJobService.getServiceDetailLastId().subscribe((result)=>{
      if(result !=null){

        this.lastId = result;
        this.stringLastId== this.lastId.serviceJobId;

        this.serviceInvoice.invoiceNumber = this.lastId.serviceJobId;


      }

    });

  }
}
