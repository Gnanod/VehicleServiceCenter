import {Component, OnInit} from '@angular/core';
import {ServicesService} from "../../Service/services.service";
import {Services} from "../../Model/Services";
import {VehicleService} from "../../Service/vehicle.service";
import {VehicleClassService} from "../../Service/vehicle-class.service";
import {VehicleClass} from "../../DTO/VehicleClass";

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {

  public services: Services = new Services();

  sid: number;
  name: string;
  desc: string;
  vehitype: string;
  price: number;


  public constructor(public servicesService: ServicesService, public vehicleClassService: VehicleClassService) {
  }


  serviceItemArray: Array<Services> = new Array<Services>();

  ngOnInit() {
    this.getAllServices();
    this.getAllClass();
  }

  addService() {


    if (this.services.vehicletype != null) {
      if (this.services.serviceName != null) {
        if (this.services.serviceDesc != null) {
          if (this.services.servicePrice != null) {
            this.servicesService.addService(this.services).subscribe((result) => {
              console.log("Nic" + this.services.serviceDesc);
              if (result != null) {
                alert("Add/Update Successful");
                this.services = new Services();
                this.getAllServices();
              }
            })
          } else {
            alert("Service Price Field  Is Empty");
          }
        } else {
          alert("Service Description Field  Is Empty");
        }
      } else {
        alert("Service Name Field  Is Empty");
      }
    } else {
      alert("Vehicle Class Is Not Selected");
    }

  }

  getAllServices() {

    this.servicesService.getAllServiceDetails().subscribe((result) => {
      this.serviceItemArray = result;
    });

  }


  editServiceDetails(sid: number, name: string, desc: string, vehitype: string, price: number) {
    this.services.serviceId = sid;
    this.services.serviceName = name;
    this.services.serviceDesc = desc;
    this.services.servicePrice = price
    this.services.vehicletype = vehitype;
  }

  deleteService(id: number) {

    if (confirm("Press a button!")) {
      this.servicesService.deleteService(id).subscribe((result) => {

        if (result == null) {

          alert('Service Deleted SuccessFully');
          this.getAllServices();
        } else {

          alert('Employee Deleted Fail');

        }
      });
    } else {

    }


  }


  className: string;
  vehicleClassServiceModel: VehicleClass = new VehicleClass();
  vehicleClassArray: Array<VehicleClass> = new Array<VehicleClass>();

  addVehicleClass() {

    this.vehicleClassServiceModel.className = this.className;
    this.vehicleClassService.addVehicleClass(this.vehicleClassServiceModel).subscribe((result) => {

      if (result != null) {
        alert('Vehicle Class Is Added Successfully');
        this.getAllClass();
      }

    });
  }

  getAllClass() {
    this.vehicleClassService.getAllClass().subscribe((result) => {

      if (result != null) {
        this.vehicleClassArray = result;
      }

    });
  }
}
