import { Component, OnInit } from '@angular/core';
import {ServicesService} from "../../Service/services.service";
import {Services} from "../../Model/Services";

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {

  private services : Services = new Services();


  public constructor(private servicesService: ServicesService) {
  }

  ngOnInit() {
  }

  addService() {

    this.servicesService.addService(this.services).subscribe((result) => {


      console.log("Nic"+this.services.serviceDesc);
      if (result != null) {
        alert("Added Successfully");
      }

    })
  }



}
