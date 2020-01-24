import { Component, OnInit } from '@angular/core';
import {ServicesServiceService} from "../../Service/services-service.service";
import {Services} from "../../Model/Services";
import {VehicleClassServiceService} from "../../Service/vehicle-class-service.service";
import Swal from "sweetalert2";
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


  public constructor(public servicesService: ServicesServiceService, public vehicleClassService: VehicleClassServiceService) {
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
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Add/Update Successful',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.services = new Services();
                this.getAllServices();
              }
            })
          } else {
            // alert("Service Price Field  Is Empty");
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Service Price Field  Is Empty',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else {
          // alert("Service Description Field  Is Empty");
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Service Description Field  Is Empty',
            showConfirmButton: false,
            timer: 1500
          })
        }
      } else {
        // alert("Service Name Field  Is Empty");
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Service Name Field  Is Empty',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      // alert("Vehicle Class Is Not Selected");
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Vehicle Class Is Not Selected',
        showConfirmButton: false,
        timer: 1500
      })
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

          // alert('Service Deleted SuccessFully');
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Service Deleted Fail',
            showConfirmButton: false,
            timer: 1500
          })
        } else {

          // alert('Employee Deleted Fail');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Employee Deleted Successfully',
            showConfirmButton: false,
            timer: 1500
          });

          this.getAllServices();

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
    console.log('class Name'+this.className);
    if(this.className!=null){
      this.vehicleClassService.addVehicleClasses(this.vehicleClassServiceModel).subscribe((result) => {

        if (result != null) {
          console.log('sUCCESS')
          // alert('Vehicle Class Is Added Successfully');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vehicle Class Is Added Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.getAllClass();
          this.className=null;
        }

      });
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Class Name Field is Empty',
        showConfirmButton: false,
        timer: 1500
      })

    }

  }

  addVehicleClassNew(){
    this.vehicleClassServiceModel.className = this.className;

    this.vehicleClassService.addVehicleClassesNew(this.vehicleClassServiceModel).subscribe((result) => {

      if (result != null) {

        // alert('Vehicle Class Is Added Successfully');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Vehicle Class Is Added Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllClass();
        this.className=null;
      }

    });
  }

  getAllClass() {
    this.vehicleClassService.getAllClass().subscribe((result) => {


      if (result != null) {
        console.log(result);
        this.vehicleClassArray = result;
      }

    });
  }
}
