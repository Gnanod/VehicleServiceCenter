import { Component, OnInit } from '@angular/core';
import {Services} from "../../Model/Services";
import {JoborderService} from "../../Service/joborder.service";
import {ServicesService} from "../../Service/services.service";
import {VehicleService} from "../../Service/vehicle.service";
import {MakeModelService} from "../../Service/make-model.service";
import {ItemService} from "../../Service/item.service";
import {DatePipe} from "@angular/common";
import {Item} from "../../Model/Item";
import {ServiceJob} from "../../Model/ServiceJob";
import {ServiceJobDetails} from "../../Model/ServiceJobDetails";
import {Vehicle} from "../../Model/Vehicle";
import {ServicejobService} from "../../Service/servicejob.service";
import {Customer} from "../../Model/Customer";

@Component({
  selector: 'app-service-job',
  templateUrl: './service-job.component.html',
  styleUrls: ['./service-job.component.css']
})
export class ServiceJobComponent implements OnInit {
  private addedServiceBeforeConfirm: Services;


  constructor(private joborderservice : JoborderService,private serviceJobService: ServicejobService, private servicesService: ServicesService
    ,private vehicleservice : VehicleService,private make_model_service :MakeModelService , private  itemService:ItemService ,private jobOrderService :JoborderService,private datePipe :DatePipe) { }

  insertSelectedServiceType: number;
  allServicesDescArray: Array<Services>= new Array<Services>();
  getServiceToAddById: number;
  searchServiceDescByName: Array<Services>;
  serviceAllArray: Array<Services>= new Array<Services>();


  /////VEHICLEEE/////////////////////////////////////////////////////

  searchVehicleDetails : Vehicle = new Vehicle();
  searchVehicleNumber : string;

  searchItemDetails : Array<Item> = new Array<Item>();
  searchItemDetails1 :Array<Item> = new Array<Item>();


  searchItem1 : string;
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

  /////VEHICLE VARIABLES OVER////////////////////////////////////////////////////////////

  //to get data to a list for a specific service job
  servicesOfTheServiceJobArrray: Array<Services> = new Array<Services>();

  ngOnInit() {
    this.getAllServicesDesc();
  }


  servicestoadd: Services;
  sendIdToAddService(value: Services){
    this.servicestoadd = value;
  }




  getAllServicesDesc(){

      this.servicesService.getAllServices().subscribe((result)=>{
        if(result!=null){
          this.allServicesDescArray = result;

        }

      });

    }

  addServiceJobsToFrontEndList(){
    this.servicesService.getServicebyId(this.getServiceToAddById).subscribe((result)=>{
      if(result!=null){
        this.addedServiceBeforeConfirm = result;

      }
    });


  }

  ilen: number;
  addToJobOrderServiceDetails(){

    console.log("The object"+this.servicestoadd.serviceDesc+"ADDEDD"+this.insertSelectedServiceType);
  }




  searchServiceByIdAndAddToList(){

      this.servicesService.getServicebyId(this.insertSelectedServiceType).subscribe((result)=>{

        if(result==null){

          // alert('Item Not Found ')
          // this.searchItemDetails.quantityOnHand=10;

        }else{
          let ser : Services;
          ser = result;
          this.servicesOfTheServiceJobArrray.push(ser);
          console.log("asdsadsad"+this.servicesOfTheServiceJobArrray[0].serviceDesc);
        }
      });
    }


  serviceJDArray: Array<ServiceJobDetails> = new Array<ServiceJobDetails>();
  serviceOrder : ServiceJob = new ServiceJob();
  serviceOrderTot: number = 0;
    addToServiceJob(){
      let i: number ;
      let serviceJD : ServiceJobDetails = new ServiceJobDetails();

      let all : number = this.servicesOfTheServiceJobArrray.length;
      for (i=0; i<all; i++){
        this.serviceOrderTot += this.servicesOfTheServiceJobArrray[i].servicePrice;
        serviceJD.service = this.servicesOfTheServiceJobArrray[i];
      }
      this.serviceJDArray.push(serviceJD);

      console.log("PRICE IS" + this.serviceOrderTot);


      this.serviceOrder.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.serviceOrder.employeeName= "Fudddd";
      this.serviceOrder.serviceJobDetails = this.serviceJDArray;
      this.serviceOrder.total = this.serviceOrderTot;
      this.serviceOrder.vehicle = this.searchVehicleDetails;


      this.serviceJobService.addServiceJob(this.serviceOrder).subscribe((result)=>{
        if(result !=null){

          console.log("LLLL"+result)
          alert("Service Added Successfully");


        }

      });

    }

    /////Get VEHICLE DETAILSS


  searchVehicleDetailsByNumber(){

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


  // getServices(value: string) {
  //
  //   console.log('hhhhhhhh'+this.insertSelectedServiceType)
  //
  //   this.jobOrderService.getServicesDesc(this.insertSelectedServiceType).subscribe((result)=>{
  //
  //     if(result!=null){
  //
  //       this.allServicesDescArray=result;
  //       //this.addTableModel=null;
  //       console.log("sadasd"+result[0].serviceDesc);
  //
  //     }
  //   });
  // }
}
