import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {JobOrder} from "../../Model/JobOrder";
import {JoborderServiceService} from "../../Service/joborder-service.service";
import {ServicesServiceService} from "../../Service/services-service.service";
import {VehicleServiceService} from "../../Service/vehicle-service.service";
import {MakeModelServiceService} from "../../Service/make-model-service.service";
import {ItemServiceService} from "../../Service/item-service.service";
import {DatePipe} from "@angular/common";
import {ServicejobServiceService} from "../../Service/servicejob-service.service";
import {ServiceInvoiceDTO} from "../../DTO/ServiceInvoiceDTO";
import {Item} from "../../Model/Item";
import {JobOrderItemDetails} from "../../Model/JobOrderItemDetails";
import {MakeModel} from "../../Model/MakeModel";
import {Vehicle} from "../../Model/Vehicle";
import {Services} from "../../Model/Services";
import {ServiceJobDetails} from "../../Model/ServiceJobDetails";
import {ServiceJob} from "../../Model/ServiceJob";
import {ServicesDTO} from "../../DTO/ServicesDTO";
import {Customer} from "../../Model/Customer";
@Component({
  selector: 'app-new-job-order',
  templateUrl: './new-job-order.component.html',
  styleUrls: ['./new-job-order.component.css']
})
export class NewJobOrderComponent implements OnInit {

  private joborder: JobOrder = new JobOrder();
  todayDate: string;

  constructor(private joborderservice: JoborderServiceService, private servicesService: ServicesServiceService
    , private vehicleservice: VehicleServiceService, private make_model_service: MakeModelServiceService, private  itemService: ItemServiceService, private jobOrderService: JoborderServiceService, private datePipe: DatePipe, private serviceJobService: ServicejobServiceService) {


  }

  ngOnInit() {

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
  odoMeter :string;

  searchVehicleNumbers(event: any) {

    if (this.serviceJobId.length != 0) {

      if (event.which === 13) {
        this.vehicleservice.searchVehicleNumbers(this.serviceJobId).subscribe((result) => {

          if (result != null) {
            this.odoMeter = result.engineNumber;
            console.log('HHHHHHHHH'+ this.odoMeter);
            this.searchVehicleDetailsByNumber(result.vehicleNumber);

          } else {

            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Job Order Not Found.',
              showConfirmButton: false,
              timer: 1500
            })
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

        console.log('odo meter');

        this.getAllServicesDesc(this.vehicleClass);
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
    let tot: number = 0;
    for (let i = 0; i < this.servicesArray.length; ++i) {

      if (this.servicesArray[i].serviceId === id) {
        this.servicesArray.splice(i, 1);

      }

    }
    for (let i = 0; i < this.servicesArray.length; ++i) {
      tot += this.servicesArray[i].servicePrice;
    }
    this.serviceOrderTot = tot;
    this.FinalTotal = tot.toFixed(2);
  }


  allServicesDescArray: Array<Services> = new Array<Services>();
  insertSelectedServiceType: Services;
  servicesOfTheServiceJobArrray: Array<ServiceJobDetails> = new Array<ServiceJobDetails>();

  getAllServicesDesc(value: string) {
    this.servicesService.getAllServices(value).subscribe((result) => {
      if (result != null) {
        this.allServicesDescArray = result;
      }

    });

  }

  addToServiceJob() {

    let s1: ServiceJob = new ServiceJob();
    s1.serviceJobId = this.serviceJobId;
    s1.employeeName = "GGGG";
    s1.presentOdoMeter =this.odoMeter;
    s1.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // s1.serviceJobDetails = this.servicesOfTheServiceJobArrray;
    s1.total = this.serviceOrderTot;
    s1.vehicle = this.searchVehicleDetails;


    this.serviceOrder.serviceJobId = this.serviceJobId;
    this.serviceOrder.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.serviceOrder.employeeName = "Fudddd";

    // this.serviceOrder.serviceJobDetails = this.servicesOfTheServiceJobArrray;
    this.serviceOrder.total = this.serviceOrderTot;


    let sendServiceDetail: ServicesDTO = new ServicesDTO();
    sendServiceDetail.serviceInvoice = this.serviceInvoice;
    sendServiceDetail.serviceOrder = s1;
    sendServiceDetail.serviceJobDetails = this.details;

    if (s1.serviceJobId != null) {
      if (this.servicesArray.length != 0) {
        this.serviceJobService.addServiceJobs(sendServiceDetail).subscribe((result) => {
          if (result != null) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Service Added Successfully.',
              showConfirmButton: false,
              timer: 1500
            })
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
            this.servicesArray = new Array<Services>();
            this.allServicesDescArray = new Array<Services>();
            this.serviceInvoice = new ServiceInvoiceDTO();
            this.details = new Array<ServiceJobDetails>();
            this.inServices = new Array<Services>();

            this.serviceOrderTot = null;
            const linkSource = 'data:application/pdf;base64,' + result.pdf;
            const downloadLink = document.createElement("a");
            const fileName = "ServiceJobCard.pdf";
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();

          }
        });
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please Add Services To Table.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Service Job Id Field is Empty.',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  // serviceJDArray: Array<ServiceJobDetails> = new Array<ServiceJobDetails>();
  serviceOrder: ServiceJob = new ServiceJob();
  FinalTotal: string;
  serviceOrderTot: number = parseFloat('0');
  inServices: Array<Services> = new Array<Services>();
  servicesArray: Array<Services> = new Array<Services>();
  details: Array<ServiceJobDetails> = new Array<ServiceJobDetails>();


  calcTotal() {
    let all: number = this.servicesArray.length;

  }

  AddDetailsToTable() {


    if (this.serviceType != null) {
      let s: ServiceJobDetails = new ServiceJobDetails();
      s.serviceJobId = this.serviceJobId;
      s.serviceId = this.serviceType.serviceId;
      this.servicesArray.push(this.serviceType);
      this.inServices.push(this.serviceType);
      this.details.push(s);

    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Select Service Type.',
        showConfirmButton: false,
        timer: 1500
      })
    }
    let i: number;
    let tot: number = 0;
    let all: number = this.servicesArray.length;
    for (i = 0; i < all; i++) {
      tot += this.servicesArray[i].servicePrice;
    }

    this.serviceOrderTot = tot;
    this.serviceInvoice.invoiceNumber = this.serviceJobId;
    this.serviceInvoice.chasisNumber = this.engineNumber;
    this.serviceInvoice.make = this.vehicleMake;
    this.serviceInvoice.model = this.vehicleModel;
    this.serviceInvoice.vehicleNumber = this.searchVehicleNumber;
    this.serviceInvoice.year = this.yearOfManufacture;
    this.serviceInvoice.customerName = this.customername;
    this.serviceInvoice.customerAddress = this.customeraddress;
    this.serviceInvoice.customerPhoneNumber = this.customerphone;
    this.serviceInvoice.services = this.inServices;
    console.log("invoice Services Length :" + this.serviceInvoice.services.length);
    this.serviceInvoice.total = tot;
    this.FinalTotal = tot.toFixed(2);

  }

  serviceType: Services;

  sendModelToService() {

  }

}
