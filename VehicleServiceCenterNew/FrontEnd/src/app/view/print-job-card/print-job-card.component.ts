import {Component, OnInit} from '@angular/core';
import {Customer} from "../../Model/Customer";
import {Vehicle} from "../../Model/Vehicle";
import {VehicleService} from "../../Service/vehicle.service";
import {JoborderService} from "../../Service/joborder.service";
import {ServicejobService} from "../../Service/servicejob.service";
import {ServiceJob} from "../../Model/ServiceJob";
import {ServicesDTO} from "../../DTO/ServicesDTO";
import {ServiceInvoiceDTO} from "../../DTO/ServiceInvoiceDTO";
import {saveAs} from 'file-saver/dist/filesaver';
import Swal from "sweetalert2";

@Component({
  selector: 'app-print-job-card',
  templateUrl: './print-job-card.component.html',
  styleUrls: ['./print-job-card.component.css']
})
export class PrintJobCardComponent implements OnInit {

  constructor(private vehicleservice: VehicleService, private jobService: JoborderService, private serviceJobService: ServicejobService) {
  }

  ngOnInit() {
    this.getServiceDetailLastId();
  }
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
  searchVehicleDetails: Vehicle = new Vehicle();
  searchVehicleNumber: string;
  lastId: ServiceJob = new ServiceJob();
  stringLastId: string;
  serviceInvoice: ServiceInvoiceDTO = new ServiceInvoiceDTO();
  searchVehDetailsByNumber(event) {
    if(event.which==13){
      this.vehicleservice.searchVehicleDetails(this.searchVehicleNumber).subscribe((result) => {
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
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Vehicle Is Not Found.',
            showConfirmButton: false,
            timer: 1500
          })
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
          this.customername = this.customer.firstName;
          this.customerphone = this.customer.phoneNumber;
          this.customeraddress = this.customer.address;
          this.customeremail = this.customer.email;
        }
      });
    }
  }
  serviceOrder: ServiceJob = new ServiceJob();
  printJobOrder() {

    this.serviceInvoice.chasisNumber = this.engineNumber;
    this.serviceInvoice.make = this.vehicleMake;
    this.serviceInvoice.model = this.vehicleModel;
    this.serviceInvoice.vehicleNumber = this.searchVehicleNumber;
    this.serviceInvoice.year = this.yearOfManufacture;
    this.serviceInvoice.customerName = this.customername;
    this.serviceInvoice.customerAddress = this.customeraddress;
    this.serviceInvoice.customerPhoneNumber = this.customerphone;

    let sendServiceDetail: ServicesDTO = new ServicesDTO();

    this.serviceOrder.serviceJobId = this.lastId.serviceJobId;
    sendServiceDetail.serviceInvoice = this.serviceInvoice;


    if (this.searchVehicleNumber != null) {


      this.jobService.printJobOrders(sendServiceDetail).subscribe((result) => {

        if (result != null) {


          /////////////////////download Byte Array//////////////////////////////////////

          const linkSource = 'data:application/pdf;base64,' + result.pdf;
          const downloadLink = document.createElement("a");
          const fileName = "lubeJobCard.pdf";
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();

          ///////////////////////////////////////////////////////////////////////////////////////


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
          this.searchVehicleNumber=null;
        } else {

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Cant Print JobOrder.',
            showConfirmButton: false,
            timer: 1500
          })

        }
      });
    }else{
      // alert("Please Enter Vehicle Number");
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Enter Vehicle Number.',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  convertDataURIToBinary(dataURI) {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  getServiceDetailLastId() {

    this.serviceJobService.getServiceDetailLastId().subscribe((result) => {
      if (result != null) {

        this.lastId = result;
        this.stringLastId == this.lastId.serviceJobId;

        this.serviceInvoice.invoiceNumber = this.lastId.serviceJobId;


      }

    });

  }
}
