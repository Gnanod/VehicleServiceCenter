import { Component, OnInit } from '@angular/core';
import {JoborderService} from "../../Service/joborder.service";
import {Vehicle} from "../../Model/Vehicle";
import {Customer} from "../../Model/Customer";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private jobOrderService :JoborderService) { }

  ngOnInit() {
    this.getTotalSales();
    this.getTodayJobCount();
    this.getMonthlyTotalSales();
  }

  totalSales :number;
  totalJobCount:number;
  monthlySales :number;

  getTotalSales(){
    this.jobOrderService.getTotalSales().subscribe((result) => {
          this.totalSales=result;
    });
  }

  getTodayJobCount(){
    this.jobOrderService.getTodayJobCount().subscribe((result) => {
      this.totalJobCount=result;
    });
  }

  getMonthlyTotalSales(){
    this.jobOrderService.getMonthlyTotalSales().subscribe((result) => {
      this.monthlySales=result;
    });
  }
}
