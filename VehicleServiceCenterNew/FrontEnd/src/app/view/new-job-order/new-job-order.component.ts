import {Component, OnInit} from '@angular/core';
import {JobOrder} from "../../Model/JobOrder";
import {JoborderService} from "../../Service/joborder.service";
import {ServicesService} from "../../Service/services.service";
import {VehicleService} from "../../Service/vehicle.service";
import {MakeModelService} from "../../Service/make-model.service";
import {ItemService} from "../../Service/item.service";
import {DatePipe} from "@angular/common";
import {ServicejobService} from "../../Service/servicejob.service";
import {Item} from "../../Model/Item";
import {JobOrderItemDetails} from "../../Model/JobOrderItemDetails";
import {MakeModel} from "../../Model/MakeModel";
import {Vehicle} from "../../Model/Vehicle";
import {Customer} from "../../Model/Customer";
import {Services} from "../../Model/Services";
import {JobOrderDTO} from "../../DTO/JoOrderDTO";
import {ServiceJobDetails} from "../../Model/ServiceJobDetails";
import {ServiceJob} from "../../Model/ServiceJob";
import html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';
import {constants} from "zlib";
import {toHtml} from "@fortawesome/fontawesome-svg-core";
import {ServiceInvoiceDTO} from "../../DTO/ServiceInvoiceDTO";
import {ServicesDTO} from "../../DTO/ServicesDTO";

// const {join} = require('path');
// const moment = require('moment');
// const pdf = require('html-pdf');
// const {promisify} = require('util');
// const read = promisify(require('fs').readFile);
// const handlebars = require('handlebars');


@Component({
  selector: 'app-new-job-order',
  templateUrl: './new-job-order.component.html',
  styleUrls: ['./new-job-order.component.css']
})
export class NewJobOrderComponent implements OnInit {

  private joborder: JobOrder = new JobOrder();
  todayDate: string;

  constructor(private joborderservice: JoborderService, private servicesService: ServicesService
    , private vehicleservice: VehicleService, private make_model_service: MakeModelService, private  itemService: ItemService, private jobOrderService: JoborderService, private datePipe: DatePipe, private serviceJobService: ServicejobService) {


  }

  ngOnInit() {

    this.getAllServicesDesc();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }


  ////////////////////////////////////////////////////////

  serviceInvoice: ServiceInvoiceDTO = new ServiceInvoiceDTO();


///////////////////

  insertItemModel: string;


  insertselectedMake: string;


  itemId: string;

  item: Item = new Item();


  type: string;

  quantity: number;

  totAmount: number = 0;


  jobOrderItemDetailsArray: Array<JobOrderItemDetails> = new Array<JobOrderItemDetails>();


  searchMakesByModel: Array<MakeModel> = new Array<MakeModel>();
  searchVehicleDetails: Vehicle = new Vehicle();
  searchVehicleNumber: string;

  vehicleId: Number;
  vehicleNumber: string;
  engineNumber: string;
  vehicleClass: string;
  vehicleMake: string;
  vehicleModel: string;
  yearOfManufacture: string;
  customer: Customer;
  customername: string;
  customerphone: string;
  customeraddress: string;
  customeremail: string;
  serviceJobId: string;

  searchVehicleNumbers(event: any) {

    if (this.serviceJobId.length != 0) {

      if (event.which === 13) {
        this.vehicleservice.searchVehicleNumbers(this.serviceJobId).subscribe((result) => {

          if (result != null) {
            this.searchVehicleDetailsByNumber(result.vehicleNumber);
          } else {

            alert("Job Order Not Found");
          }

        });
      }

    }


  }

  searchVehicleDetailsByNumber(value: string) {
    this.vehicleservice.searchVehicleDetails(value).subscribe((result) => {
      if (result == null) {
        this.vehicleId = null;
        this.engineNumber = null;
        this.vehicleClass = null;
        this.vehicleMake = null;
        this.vehicleModel = null;
        this.yearOfManufacture = null;
        this.customer = null;

        this.customername = null;
        this.customerphone = null;
        this.customeraddress = null;
        this.customeremail = null;
      }
      else {
        this.searchVehicleDetails = result;
        this.vehicleId = this.searchVehicleDetails.vehicleId;
        this.searchVehicleNumber = value;
        this.vehicleNumber = this.searchVehicleDetails.vehicleNumber;
        this.engineNumber = this.searchVehicleDetails.engineNumber;
        this.vehicleClass = this.searchVehicleDetails.vehicleClass;
        this.vehicleId = this.searchVehicleDetails.vehicleId;
        this.vehicleMake = this.searchVehicleDetails.vehicleMake;
        this.vehicleModel = this.searchVehicleDetails.vehicleModel;
        this.yearOfManufacture = this.searchVehicleDetails.yearOfManufacture;
        this.customer = this.searchVehicleDetails.customer;

        this.customername = this.customer.firstName;
        this.customerphone = this.customer.phoneNumber;
        this.customeraddress = this.customer.address;
        this.customeremail = this.customer.email;


      }
    });
  }


  getMakeModelDetails(value: string) {

    console.log("JJJJ" + this.insertselectedMake);
    this.make_model_service.getMakeModelDetails(this.insertselectedMake).subscribe((result) => {

      if (result != null) {

        this.searchMakesByModel = result;
        //this.addTableModel=null;

      }
    });

  }


  deleteRow(id) {

    for (let i = 0; i < this.jobOrderItemDetailsArray.length; ++i) {
      if (this.jobOrderItemDetailsArray[i].item.itemId === id) {

        let buyingPrice: number = this.jobOrderItemDetailsArray[i].item.quantityOfPrice;
        let quantity: number = this.jobOrderItemDetailsArray[i].qty;
        let totAmount: number = buyingPrice * quantity;

        this.totAmount = this.totAmount - totAmount;
        this.jobOrderItemDetailsArray.splice(i, 1);

      }
    }

  }


  allServicesDescArray: Array<Services> = new Array<Services>();

  insertSelectedServiceType: Services;
  servicesOfTheServiceJobArrray: Array<ServiceJobDetails> = new Array<ServiceJobDetails>();

  getAllServicesDesc() {

    this.servicesService.getAllServices().subscribe((result) => {
      if (result != null) {
        this.allServicesDescArray = result;
      }

    });

  }


  // insertSelectedServiceType:Services;
  // servicestoadd: Services;
  // sendIdToAddService(){
  //    this.servicestoadd =insertSelectedServiceType;
  //  console.log(this.servicestoadd.serviceName);
  //  console.log(this.servicestoadd.serviceId);
  //
  // }


  addToServiceJob() {

     let s1 : ServiceJob = new ServiceJob();
     s1.serviceJobId= this.serviceJobId;
     s1.employeeName = "GGGG";
     s1.date  = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
     s1.serviceJobDetails = this.servicesOfTheServiceJobArrray;
     s1.total = this.serviceOrderTot;
     s1.vehicle = this.searchVehicleDetails;



    this.serviceOrder.serviceJobId = this.serviceJobId;
    this.serviceOrder.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.serviceOrder.employeeName = "Fudddd";

    this.serviceOrder.serviceJobDetails = this.servicesOfTheServiceJobArrray;
    this.serviceOrder.total = this.serviceOrderTot;




    let sendServiceDetail: ServicesDTO = new ServicesDTO();
    sendServiceDetail.serviceInvoice = this.serviceInvoice;
    sendServiceDetail.serviceOrder = s1;
    this.serviceJobService.addServiceJobs(sendServiceDetail).subscribe((result) => {
      if (result != null) {
        alert("Service Added Successfully");
        this.servicesOfTheServiceJobArrray = new Array<ServiceJobDetails>();
        this.serviceJobId = null;
        this.searchVehicleNumber = null;
        this.engineNumber = null;
        this.vehicleClass = null;
        this.vehicleMake = null;
        this.vehicleModel = null;
        this.yearOfManufacture = null;
        this.customername = null;
        this.customerphone = null;
        this.customeremail = null;
        this.customeraddress = null;

        const linkSource = 'data:application/pdf;base64,' + result.pdf;
        const downloadLink = document.createElement("a");
        const fileName = "ServiceJobCard.pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

      }

    });

  }


  // searchServiceByIdAndAddToList(){
  //
  //   this.servicesService.getServicebyId(this.insertSelectedServiceType).subscribe((result)=>{
  //
  //     if(result==null){
  //
  //     }else{
  //       let ser : Services;
  //       ser = result;
  //       this.servicesOfTheServiceJobArrray.push(ser);
  //       this.serviceInvoice.invoiceNumber = this.serviceJobId;
  //       this.serviceInvoice.chasisNumber= this.engineNumber;
  //       this.serviceInvoice.make = this.vehicleMake;
  //       this.serviceInvoice.model = this.vehicleModel;
  //       this.serviceInvoice.vehicleNumber= this.searchVehicleNumber;
  //       this.serviceInvoice.year  = this.yearOfManufacture;
  //       this.serviceInvoice.customerName = this.customername;
  //       this.serviceInvoice.customerAddress = this.customeraddress;
  //       this.serviceInvoice.customerPhoneNumber = this.customerphone;
  //       this.serviceInvoice.services = this.servicesOfTheServiceJobArrray;
  //
  //
  //       let i: number ;
  //
  //       let all : number = this.servicesOfTheServiceJobArrray.length;
  //       for (i=0; i<all; i++){
  //         this.serviceOrderTot += this.servicesOfTheServiceJobArrray[i].servicePrice;
  //         this.serviceJD.service = this.servicesOfTheServiceJobArrray[i];
  //       }
  //       this.serviceJDArray.push(this.serviceJD);
  //     }
  //   });
  // }


  // serviceJDArray: Array<ServiceJobDetails> = new Array<ServiceJobDetails>();
  serviceOrder: ServiceJob = new ServiceJob();
  serviceOrderTot: number = 0;
   inServices :Array<Services> = new Array<Services>();
  AddDetailsToTable() {

    let serviceJobDetail : ServiceJobDetails = new ServiceJobDetails();

    serviceJobDetail.services = this.serviceType;

    this.servicesOfTheServiceJobArrray.push(serviceJobDetail);
    this.inServices.push(this.serviceType);
    let i: number;
    let tot: number = 0;
    let all: number = this.servicesOfTheServiceJobArrray.length;
    for (i = 0; i < all; i++) {
       console.log("this.servicesOfTheServiceJobArrray[i].servicePrice" + this.servicesOfTheServiceJobArrray[i].services.serviceId);
      tot += this.servicesOfTheServiceJobArrray[i].services.servicePrice;
      //this.serviceJD.service = this.servicesOfTheServiceJobArrray[i];
    }
    this.serviceOrderTot = tot;
    this.serviceInvoice.invoiceNumber = this.serviceJobId;
    this.serviceInvoice.chasisNumber= this.engineNumber;
    this.serviceInvoice.make = this.vehicleMake;
    this.serviceInvoice.model = this.vehicleModel;
    this.serviceInvoice.vehicleNumber= this.searchVehicleNumber;
    this.serviceInvoice.year  = this.yearOfManufacture;
    this.serviceInvoice.customerName = this.customername;
    this.serviceInvoice.customerAddress = this.customeraddress;
    this.serviceInvoice.customerPhoneNumber = this.customerphone;
    this.serviceInvoice.services = this.inServices;
    this.serviceInvoice.total = tot;

  }

  serviceType: Services;

  sendModelToService() {

  }
}
