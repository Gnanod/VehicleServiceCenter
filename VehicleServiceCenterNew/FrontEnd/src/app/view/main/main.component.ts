import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    headerText: string;

    public constructor(private router:Router) {

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
        } else if(this.router.url=='/main/StockManagement'){
          this.headerText="Stock Management";
        } else if(this.router.url == '/main/ServiceManagement'){
          this.headerText="Service Management";
        }else if(this.router.url == '/main/SupplierCreditReports'){
          this.headerText="Supplier Payments Report";
        }else if(this.router.url == '/main/SupplierPayments'){
          this.headerText="Supplier Payments";

        }else if(this.router.url == '/main/CustomerPayments') {

          this.headerText = "Customer Payments";
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
        }else if(button == "Stock Management"){
          this.router.navigate(['/main/StockManagement'])

        }else if(button == 'Service Management'){

          this.router.navigate(['/main/ServiceManagement'])

        }else if(button == 'LowStockLevel'){

          this.router.navigate(['/main/LowStockLevel'])

        }else if (button == 'Services'){

          this.router.navigate(['main/jobOrder'])

        }else if(button == 'Supplier Payments Reports'){

          this.router.navigate(['main/SupplierCreditReports'])

        }else if(button == 'Supplier Payements'){

          this.router.navigate(['main/SupplierPayments'])

        }else if(button == 'Customer Payments'){

          this.router.navigate(['main/CustomerPayments'])
        }else if(button == 'Details'){

          this.router.navigate(['main/LubeDetailJob'])

        }else if(button == 'Print Job Card'){

          this.router.navigate(['main/printJobCard'])

        }

    }
}
