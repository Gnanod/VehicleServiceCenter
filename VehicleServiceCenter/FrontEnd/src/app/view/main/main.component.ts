import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    headerText: string;

    constructor(private router:Router) {

        router.events.subscribe((val) => {
            this.setHeaderTextAndButtons();
        });

    }

  ngOnInit() {
  }

    setHeaderTextAndButtons() {

        if (this.router.url == '/main/dashboard') {
            this.headerText = "Dashboard";
        } else if (this.router.url == '/main/customer_vehicle') {
            this.headerText = "Customer Vehicle Details";
        } else if (this.router.url == '/main/employee') {
            this.headerText = "Employees";
        } else if(this.router.url == '/main/searchVehicle'){
            this.headerText = "SearchVehicle";
        } else if(this.router.url == '/main/customerVehicle'){
            this.headerText = "AddVehicle";
        } else if(this.router.url== '/main/supplier'){
            this.headerText="Supplier";
        }

    }

    changeRoute(button) {
        console.log(button)
        if (button == "Dashboard") {
            this.router.navigate(['/main/dashboard'])
        } else if (button == "Employees") {
            this.router.navigate(['/main/employee'])
        } else if(button == "SearchVehicle"){
            this.router.navigate(['/main/searchVehicle'])
        } else if(button == "AddVehicle"){
            this.router.navigate(['/main/customerVehicle'])
        }else  if(button == "Supplier"){
            this.router.navigate(['/main/supplier'])
        }
    }
}
