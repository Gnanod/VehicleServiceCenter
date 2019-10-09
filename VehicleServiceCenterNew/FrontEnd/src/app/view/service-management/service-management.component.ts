import { Component, OnInit } from '@angular/core';
import {ServicesService} from "../../Service/services.service";
import {Services} from "../../Model/Services";

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {

  public services : Services = new Services();

  sid: number;
  name: string;
  desc: string;
  vehitype: string;
  price:number;



  public constructor(public servicesService: ServicesService) {
  }



  serviceItemArray:Array<Services> = new Array<Services>();

  ngOnInit() {
    this.getAllServices();
  }

  addService() {

    this.servicesService.addService(this.services).subscribe((result) => {


      console.log("Nic"+this.services.serviceDesc);
      if (result != null) {
        alert("Add/Update Successful");
      }

    })
  }

  getAllServices() {

    this.servicesService.getAllServices().subscribe((result) => {
      this.serviceItemArray = result;
    });

}


  editServiceDetails(sid: number, name: string , desc: string ,vehitype: string, price:number){
      this.services.serviceId =sid;
      this.services.serviceName =name;
      this.services.serviceDesc = desc;
      this.services.servicePrice = price
      this.services.vehicletype = vehitype;
 }

  deleteService(id: number){
    this.servicesService.deleteService(id).subscribe((result)=>{

      if(result==null){

        alert('Service Deleted SuccessFully');

      }else{

        alert('Employee Deleted Fail');

      }
    });
  }

}
